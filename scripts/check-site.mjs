import { readFile, readdir, stat } from "node:fs/promises";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
const site = fileURLToPath(new URL("../site/", import.meta.url));
const allowed = new Set([
  "index.html",
  "how-it-works.html",
  "beta-install.html",
  "pricing.html",
  "privacy.html",
  "support.html",
  "404.html",
  "styles.css",
  "robots.txt",
  "_headers",
  "branding",
]);
for (const item of await readdir(site))
  assert(allowed.has(item), `Unexpected public asset: ${item}`);
for (const file of [...allowed].filter((x) => x.endsWith(".html"))) {
  const html = await readFile(path.join(site, file), "utf8");
  assert(
    html.includes('aria-label="Main navigation"') &&
      html.includes('class="wordmark"'),
    `${file}: missing shared layout`,
  );
  assert(html.includes("noindex,nofollow"), `${file}: missing beta noindex`);
  assert.equal(
    (html.match(/<h1[ >]/g) || []).length,
    1,
    `${file}: one main heading required`,
  );
  for (const [, value] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|#)/.test(value)) continue;
    const target = path.resolve(
      site,
      value === "./" ? "index.html" : value.split("#")[0],
    );
    assert(target.startsWith(site), `Link escapes public site: ${value}`);
    assert((await stat(target)).isFile(), `${file}: broken link ${value}`);
  }
}
assert(
  !(await readdir(site)).includes("admin"),
  "Administration must not ship in public assets",
);
console.log(
  "Shared navigation, local links, branding, beta indexing, and public inventory verified.",
);
