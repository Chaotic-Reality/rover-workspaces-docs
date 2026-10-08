import { mkdir, readFile, writeFile, cp } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import path from "node:path";
import {
  pages,
  documents,
  groups,
  pageUrl,
  documentUrl,
  sourceUrl,
} from "./site-content.mjs";
import { escapeHtml, renderDocument } from "./render-document.mjs";
import { siteUrl } from "./site-config.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const acronym =
  "<strong>R</strong>estore, <strong>O</strong>rganize, <strong>V</strong>iew, <strong>E</strong>xplore, <strong>R</strong>epeat";
function layout(id, title, content, sourceHash = "", route = pageUrl(id)) {
  const links = pages
    .filter(([key]) => !["404", "report-bug", "issues"].includes(key))
    .map(
      ([key, label]) =>
        `<a href="${pageUrl(key)}"${key === id || (key === "support" && ["report-bug", "issues"].includes(id)) ? ' aria-current="page"' : ""}>${label}</a>`,
    )
    .join("\n");
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><meta name="description" content="ROVER Workspaces: Restore, Organize, View, Explore, Repeat. ${escapeHtml(title)}.">
${sourceHash ? `<meta name="rover-doc-source-sha256" content="${sourceHash}">` : ""}
<link rel="canonical" href="${escapeHtml(new URL(route, siteUrl).href)}">
<title>${escapeHtml(title)} · ROVER Workspaces</title><link rel="icon" href="/branding/favicon.svg"><link rel="stylesheet" href="/styles.css"></head>
<body><a class="skip-link" href="#main">Skip to content</a><header><div class="shell header-content">
<a class="brand" href="/" aria-label="ROVER Workspaces home"><img src="/branding/rover-mark.png" width="78" height="78" alt=""><span class="wordmark"><strong>ROVER</strong><span>Workspaces</span></span></a>
<nav aria-label="Main navigation">${links}</nav></div></header>
<main id="main" class="shell${sourceHash ? " documentation" : ""}">${content}</main>
<footer><div class="shell"><p class="brand-meaning">ROVER means ${acronym}.</p><p>Make room for focus. This is a development beta; store availability and cloud services have not been announced.</p><nav aria-label="Footer navigation">${links}</nav></div></footer></body></html>\n`;
}
function guideNav(current) {
  return `<aside class="docs-sidebar"><a class="docs-home" href="/docs.html">Documentation</a><nav aria-label="Documentation navigation">${groups
    .map(
      (group) =>
        `<details${current.group === group ? " open" : ""}><summary>${escapeHtml(group)}</summary><div>${documents
          .filter((d) => d.group === group)
          .map(
            (doc) =>
              `<a href="${documentUrl(doc)}"${doc.slug === current.slug ? ' aria-current="page"' : ""}>${escapeHtml(doc.title)}</a>`,
          )
          .join("")}</div></details>`,
    )
    .join("")}</nav></aside>`;
}
const hub = `<p class="eyebrow">Guides and project reference</p><h1>ROVER documentation</h1><p class="lead">Learn the app, protect your workspaces, and follow what is being built. These pages come directly from the maintained public documentation.</p><div class="docs-shortcuts"><a class="button" href="/docs/user-guide.html">Start with the user guide</a><a class="button secondary" href="/docs/status.html">Check feature status</a><a class="button secondary" href="/docs/changelog.html">See what changed</a></div>${groups
  .map(
    (group) =>
      `<section class="docs-group"><h2>${escapeHtml(group)}</h2><div class="grid docs-grid">${documents
        .filter((d) => d.group === group)
        .map(
          (doc) =>
            `<article class="card"><h3><a href="${documentUrl(doc)}">${escapeHtml(doc.title)}</a></h3><p>${escapeHtml(doc.description)}</p></article>`,
        )
        .join("")}</div></section>`,
  )
  .join("")}`;

await mkdir(path.join(root, "site/docs"), { recursive: true });
await cp(path.join(root, "web/assets"), path.join(root, "site"), {
  recursive: true,
});
for (const [id, title] of pages) {
  const content =
    id === "docs"
      ? hub
      : await readFile(path.join(root, `web/pages/${id}.html`), "utf8");
  await writeFile(
    path.join(root, `site/${id}.html`),
    layout(id, title, content),
  );
}
for (const doc of documents) {
  const markdown = await readFile(path.join(root, doc.source), "utf8");
  const hash = createHash("sha256")
    .update(markdown.replace(/\r\n/g, "\n"))
    .digest("hex");
  const rendered = renderDocument(markdown);
  const heading = rendered.html.match(/^<h1\b[^>]*>[\s\S]*?<\/h1>\n?/);
  if (!heading)
    throw new Error(`${doc.source}: start the document with its title.`);
  const contents = rendered.headings.length
    ? `<details class="doc-contents"><summary>On this page</summary><nav aria-label="On this page">${rendered.headings
        .map(
          (heading) =>
            `<a class="toc-level-${heading.depth}" href="#${escapeHtml(heading.id)}">${escapeHtml(heading.text)}</a>`,
        )
        .join("")}</nav></details>`
    : "";
  const content = `${guideNav(doc)}<article class="doc-article"><div class="doc-breadcrumb"><a href="/docs.html">Documentation</a><span aria-hidden="true">/</span><span>${escapeHtml(doc.group)}</span></div>${heading[0]}<p class="doc-description">${escapeHtml(doc.description)}</p>${contents}<div class="prose">${rendered.html.slice(heading[0].length)}</div><p class="doc-source">This page is generated from the maintained documentation. <a href="${sourceUrl(doc.source)}">View its source and revision history on GitHub</a>.</p></article>`;
  await writeFile(
    path.join(root, `site/docs/${doc.slug}.html`),
    layout("docs", doc.title, content, hash, documentUrl(doc)),
  );
}
console.log(
  `Built ${pages.length} site pages and ${documents.length} documentation pages from their canonical sources.`,
);
