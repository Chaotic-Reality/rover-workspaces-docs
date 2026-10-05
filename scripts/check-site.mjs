import { readFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pages, documents } from "./site-content.mjs";
const root = fileURLToPath(new URL("../", import.meta.url));
const site = path.join(root, "site");
const htmlFiles = [
  ...pages.map(([id]) => `${id}.html`),
  ...documents.map((d) => `docs/${d.slug}.html`),
];
const allowed = new Set([
  ...htmlFiles,
  "styles.css",
  "robots.txt",
  "_headers",
  "branding/rover-mark.png",
  "branding/favicon.svg",
]);
async function inventory(directory, prefix = "") {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const relative = `${prefix}${entry.name}`;
    assert(
      !entry.isSymbolicLink(),
      `Symbolic links must not be published: ${relative}`,
    );
    if (entry.isDirectory())
      files.push(
        ...(await inventory(path.join(directory, entry.name), `${relative}/`)),
      );
    else files.push(relative);
  }
  return files;
}
const actual = await inventory(site);
assert.deepEqual(
  actual.sort(),
  [...allowed].sort(),
  "Public inventory differs from reviewed pages/assets; admin and private files must stay out.",
);
assert.equal(
  new Set(documents.map((d) => d.slug)).size,
  documents.length,
  "Duplicate documentation URL",
);
const markdownFiles = (await readdir(root)).filter(
  (file) => file.endsWith(".md") && file !== "AGENTS.md",
);
assert.deepEqual(
  markdownFiles.sort(),
  documents.map((d) => d.source).sort(),
  "Register new public Markdown documents in scripts/site-content.mjs.",
);
const contents = new Map(
  await Promise.all(
    htmlFiles.map(async (file) => [
      file,
      await readFile(path.join(site, file), "utf8"),
    ]),
  ),
);
for (const [file, html] of contents) {
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
  assert(
    !/<(?:script|iframe|object|embed)\b|\son\w+=/i.test(html),
    `${file}: unexpected executable content`,
  );
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(
    new Set(ids).size,
    ids.length,
    `${file}: duplicate heading/element ID`,
  );
  for (const [, value] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:)/i.test(value)) continue;
    const url = new URL(value, `https://site.test/${file}`);
    assert.equal(
      url.origin,
      "https://site.test",
      `${file}: unsupported URL ${value}`,
    );
    const target = decodeURIComponent(url.pathname).slice(1) || "index.html";
    assert(
      allowed.has(target),
      `${file}: broken or unreviewed local link ${value}`,
    );
    if (url.hash) {
      const fragment = decodeURIComponent(url.hash.slice(1));
      assert(
        contents.get(target)?.includes(`id="${fragment}"`),
        `${file}: missing anchor ${value}`,
      );
    }
  }
}
for (const doc of documents) {
  const source = (await readFile(path.join(root, doc.source), "utf8")).replace(
    /\r\n/g,
    "\n",
  );
  const hash = createHash("sha256").update(source).digest("hex");
  const html = contents.get(`docs/${doc.slug}.html`);
  assert(
    html.includes(`name="rover-doc-source-sha256" content="${hash}"`),
    `${doc.source}: generated page is stale`,
  );
  assert(
    html.includes('aria-label="Documentation navigation"') &&
      (!/<h[23]\b/.test(html) || html.includes('aria-label="On this page"')),
    `${doc.source}: documentation navigation missing`,
  );
}
console.log(
  `Verified ${htmlFiles.length} pages: navigation, source freshness, assets, local links/anchors, headings, and public boundaries.`,
);
