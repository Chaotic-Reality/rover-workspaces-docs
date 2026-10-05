import { mkdir, readFile, writeFile, cp } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const pages = [
  ["index", "Home"],
  ["how-it-works", "How it works"],
  ["beta-install", "Beta setup"],
  ["pricing", "Plans"],
  ["privacy", "Privacy"],
  ["support", "Support"],
  ["404", "Page not found"],
];
const acronym =
  "<strong>R</strong>estore, <strong>O</strong>rganize, <strong>V</strong>iew, <strong>E</strong>xplore, <strong>R</strong>epeat";
await mkdir(path.join(root, "site/branding"), { recursive: true });
await cp(path.join(root, "web/assets"), path.join(root, "site"), {
  recursive: true,
});
for (const [id, title] of pages) {
  const content = await readFile(
    path.join(root, `web/pages/${id}.html`),
    "utf8",
  );
  const links = pages
    .filter(([key]) => key !== "404")
    .map(
      ([key, label]) =>
        `<a href="${key === "index" ? "./" : `./${key}.html`}"${key === id ? ' aria-current="page"' : ""}>${label}</a>`,
    )
    .join("\n");
  await writeFile(
    path.join(root, `site/${id}.html`),
    `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><meta name="description" content="ROVER Workspaces: Restore, Organize, View, Explore, Repeat. A browser workspace manager in development.">
<title>${title} · ROVER Workspaces</title><link rel="icon" href="./branding/favicon.svg"><link rel="stylesheet" href="./styles.css"></head>
<body><a class="skip-link" href="#main">Skip to content</a><header><div class="shell header-content">
<a class="brand" href="./" aria-label="ROVER Workspaces home"><img src="./branding/rover-mark.png" width="78" height="78" alt=""><span class="wordmark"><strong>ROVER</strong><span>Workspaces</span></span></a>
<nav aria-label="Main navigation">${links}</nav></div></header>
<main id="main" class="shell">${content}</main>
<footer><div class="shell"><p class="brand-meaning">ROVER means ${acronym}.</p><p>Make room for focus. This is a development beta; store availability and cloud services have not been announced.</p><nav aria-label="Footer navigation">${links}</nav></div></footer></body></html>\n`,
  );
}
console.log(
  `Built ${pages.length} pages with one shared brand and navigation.`,
);
