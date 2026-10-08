import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { pages, documents, pageUrl, documentUrl } from "./site-content.mjs";
import { siteUrl } from "./site-config.mjs";
import { normalizeLiveHtml } from "./smoke-content.mjs";
const args = process.argv.slice(2);
const gated = args.includes("--access-gate");
const base = new URL(args.find((arg) => !arg.startsWith("--")) || siteUrl);
const routes = [
  ...pages.filter(([id]) => id !== "404").map(([id]) => pageUrl(id)),
  ...documents.map(documentUrl),
];
if (gated) {
  for (const route of [
    ...routes,
    "/styles.css",
    "/branding/rover-mark.png",
    "/admin/",
    "/AGENTS.md",
  ]) {
    const response = await fetch(new URL(route, base), { redirect: "manual" });
    assert.equal(
      response.status,
      302,
      `${route}: unsigned visitor must be sent to Access`,
    );
    const login = new URL(response.headers.get("location"));
    assert(
      login.hostname.endsWith(".cloudflareaccess.com"),
      `${route}: unexpected sign-in host`,
    );
    assert.equal(
      login.pathname,
      `/cdn-cgi/access/login/${base.hostname}`,
      `${route}: unexpected sign-in route`,
    );
  }
  console.log(
    `Access gate smoke passed: all site content requires sign-in at ${base.origin}.`,
  );
  process.exit(0);
}
// Small batches avoid needlessly flooding the free staging site.
for (let offset = 0; offset < routes.length; offset += 4) {
  await Promise.all(
    routes.slice(offset, offset + 4).map(async (route) => {
      const response = await fetch(new URL(route, base));
      assert.equal(response.status, 200, route);
      const html = await response.text();
      assert(
        html.includes('class="wordmark"'),
        `${route}: shared brand missing`,
      );
      const local = await readFile(
        new URL(
          `../site/${route === "/" ? "index.html" : route.slice(1)}`,
          import.meta.url,
        ),
        "utf8",
      );
      assert.equal(
        normalizeLiveHtml(html),
        local.replace(/\r\n/g, "\n"),
        `${route}: deployed content differs from build`,
      );
    }),
  );
}
for (const route of ["/admin/", "/AGENTS.md", "/not-a-rover-page"])
  assert.equal((await fetch(new URL(route, base))).status, 404, route);
console.log(
  `Website smoke passed: ${routes.length} live pages match the build; nonpublic paths remain unavailable at ${base.origin}.`,
);
