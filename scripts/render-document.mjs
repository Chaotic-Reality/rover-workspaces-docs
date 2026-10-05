import { Marked, Renderer } from "marked";
import { documents, documentUrl } from "./site-content.mjs";
export const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c],
  );

// Documentation links stay on the branded site. GitHub remains the source/editor.
export function rewriteLink(href) {
  const value = href.trim();
  const repo = "https://github.com/Chaotic-Reality/rover-workspaces-docs";
  if (value === repo || value === `${repo}/`) return "/docs.html";
  if (value.startsWith(`${repo}/wiki/User-Guide`))
    return (
      "/docs/user-guide.html" + value.slice(`${repo}/wiki/User-Guide`.length)
    );
  const local = value.startsWith(`${repo}/blob/main/`)
    ? value.slice(`${repo}/blob/main/`.length)
    : value.replace(/^\.\//, "");
  const [filename, ...fragment] = local.split("#");
  const doc = documents.find((d) => d.source === filename);
  if (doc)
    return documentUrl(doc) + (fragment.length ? `#${fragment.join("#")}` : "");
  if (/\.md(?:#|$)/i.test(value))
    throw new Error(`Unregistered documentation link: ${value}`);
  if (
    /^https?:\/\//i.test(value) ||
    /^mailto:/i.test(value) ||
    value.startsWith("#") ||
    /^\/(?!\/)/.test(value)
  )
    return value;
  throw new Error(`Unsupported documentation link: ${value}`);
}
export function renderDocument(markdown) {
  const headings = [];
  const usedIds = new Set();
  let mainHeadings = 0;
  const renderer = {
    html({ text }) {
      return escapeHtml(text);
    },
    heading({ tokens, depth }) {
      if (depth === 1) mainHeadings++;
      const html = this.parser.parseInline(tokens);
      const plain = html
        .replace(/<[^>]*>/g, "")
        .replace(/&amp;/g, "&")
        .replace(/&(?:lt|gt|quot|#39);/g, "");
      const base =
        plain
          .toLowerCase()
          .replace(/[^\p{L}\p{N}\s_-]/gu, "")
          .trim()
          .replace(/\s/g, "-") || "section";
      let id = base;
      for (let suffix = 1; usedIds.has(id); suffix++) id = `${base}-${suffix}`;
      usedIds.add(id);
      if (depth === 2 || depth === 3) headings.push({ id, text: plain, depth });
      return `<h${depth} id="${escapeHtml(id)}">${html}</h${depth}>\n`;
    },
    link({ href, title, tokens }) {
      return `<a href="${escapeHtml(rewriteLink(href))}"${title ? ` title="${escapeHtml(title)}"` : ""}>${this.parser.parseInline(tokens)}</a>`;
    },
    image({ href, title, text }) {
      if (!/^\/(?!\/)/.test(href))
        throw new Error("Documentation images must use reviewed local assets.");
      return `<img src="${escapeHtml(href)}" alt="${escapeHtml(text)}"${title ? ` title="${escapeHtml(title)}"` : ""} loading="lazy">`;
    },
    table(token) {
      return `<div class="table-scroll" role="region" aria-label="Scrollable table" tabindex="0">${Renderer.prototype.table.call(this, token)}</div>`;
    },
  };
  const parser = new Marked({ gfm: true, renderer });
  const html = parser.parse(markdown);
  if (mainHeadings !== 1)
    throw new Error(
      "Each published document must have exactly one level-one heading.",
    );
  return { html, headings };
}
