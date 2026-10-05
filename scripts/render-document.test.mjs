import { test } from "node:test";
import assert from "node:assert/strict";
import { renderDocument, rewriteLink } from "./render-document.mjs";

test("Markdown tables, nested lists, task states, and duplicate heading anchors survive rendering", () => {
  const result = renderDocument(
    "# Guide\n\n## Step\n\n- [ ] Pending\n- [x] Done\n  - Detail\n\n## Step\n\n| Plan | Limit |\n| --- | --- |\n| Free | Two |\n",
  );
  assert(
    result.html.includes("<table>") && result.html.includes('role="region"'),
  );
  assert(
    result.html.includes('disabled=""') && result.html.includes('checked=""'),
  );
  assert.deepEqual(
    result.headings.map((h) => h.id),
    ["step", "step-1"],
  );
});
test("local, same-repository, and old wiki links become branded documentation URLs", () => {
  assert.equal(
    rewriteLink("ROADMAP.md#launch-learning"),
    "/docs/roadmap.html#launch-learning",
  );
  assert.equal(
    rewriteLink(
      "https://github.com/Chaotic-Reality/rover-workspaces-docs/blob/main/PRIVACY.md",
    ),
    "/docs/privacy.html",
  );
  assert.equal(
    rewriteLink(
      "https://github.com/Chaotic-Reality/rover-workspaces-docs/wiki/User-Guide",
    ),
    "/docs/user-guide.html",
  );
  assert.equal(
    rewriteLink(
      "https://github.com/Chaotic-Reality/rover-workspaces-docs/issues",
    ),
    "https://github.com/Chaotic-Reality/rover-workspaces-docs/issues",
  );
});
test("raw HTML cannot execute and unsafe links/private references cannot be published", () => {
  const rendered = renderDocument(
    '# Guide\n\n<script>alert(1)</script>\n\n<a onclick="bad()">raw</a>',
  );
  assert(
    !rendered.html.includes("<script>") &&
      rendered.html.includes("&lt;script&gt;"),
  );
  for (const href of [
    "javascript:alert(1)",
    "data:text/html,bad",
    "//tracking.test",
    "../private/secret.md",
    "AGENTS.md",
  ])
    assert.throws(() => rewriteLink(href));
  assert.throws(() =>
    renderDocument("# Guide\n\n![remote](https://tracking.test/image.png)"),
  );
});
test("missing or multiple primary headings fail instead of producing confusing pages", () => {
  assert.throws(() => renderDocument("## Missing title"));
  assert.throws(() => renderDocument("# First\n\n# Second"));
});
