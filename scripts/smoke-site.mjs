import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { pages, documents, pageUrl, documentUrl } from "./site-content.mjs";
const base = new URL(
  process.argv[2] || "https://rover-workspaces-beta.tech-e40.workers.dev",
);
const routes = [
  ...pages.filter(([id]) => id !== "404").map(([id]) => pageUrl(id)),
  ...documents.map(documentUrl),
];
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
        html.replace(/\r\n/g, "\n"),
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
