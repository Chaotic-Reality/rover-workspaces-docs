import assert from "node:assert/strict";
import test from "node:test";
import { normalizeLiveHtml } from "./smoke-content.mjs";

test("edge detection may be removed while page changes remain visible", () => {
  const detection = `<script>(function(){function c(){var b=a.contentDocument||(a.contentWindow&&a.contentWindow.document);window.__CF$cv$params={r:'example'};var path='/cdn-cgi/challenge-platform/scripts/jsd/main.js';}})();</script>`;
  const expected = "<body>ROVER</body>\n";
  assert.equal(normalizeLiveHtml(`<body>ROVER${detection}</body>\r\n`), expected);
  assert.notEqual(normalizeLiveHtml(`<body>Changed${detection}</body>\n`), expected);
});

test("unexpected scripts, incomplete wrappers, and misplaced detection are retained", () => {
  for (const script of [
    "<script>alert('unexpected')</script>",
    "<script>window.__CF$cv$params={};var path='/cdn-cgi/challenge-platform/scripts/jsd/main.js';</script>",
    "<script>(function(){function c(){var b=a.contentDocument||(a.contentWindow&&a.contentWindow.document);}})();</script>",
  ]) {
    const html = `<body>ROVER${script}</body>`;
    assert.equal(normalizeLiveHtml(html), html);
  }
});
