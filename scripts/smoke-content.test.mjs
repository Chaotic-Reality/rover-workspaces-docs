import assert from "node:assert/strict";
import test from "node:test";
import { normalizeLiveHtml, normalizeAccountMenu } from "./smoke-content.mjs";

test("only the reviewed account slot differs between personalized page shells", () => {
  const shell = (body) =>
    `<header><!-- ROVER_ACCOUNT_START -->${body}<!-- ROVER_ACCOUNT_END --></header><main>ROVER</main>`;
  assert.equal(
    normalizeAccountMenu(shell("Account")),
    normalizeAccountMenu(shell("Signed in")),
  );
  assert.notEqual(
    normalizeAccountMenu(
      shell("Account").replace("<main>ROVER", "<main>Changed"),
    ),
    normalizeAccountMenu(shell("Signed in")),
  );
  for (const body of [
    "<script>alert(1)</script>",
    '<img onerror="alert(1)">',
    '<iframe src="/">',
  ])
    assert.equal(normalizeAccountMenu(shell(body)), shell(body));
});

test("edge detection may be removed while page changes remain visible", () => {
  const detection = `<script>(function(){function c(){var b=a.contentDocument||(a.contentWindow&&a.contentWindow.document);window.__CF$cv$params={r:'example'};var path='/cdn-cgi/challenge-platform/scripts/jsd/main.js';}})();</script>`;
  const expected = "<body>ROVER</body>\n";
  assert.equal(
    normalizeLiveHtml(`<body>ROVER${detection}</body>\r\n`),
    expected,
  );
  assert.equal(
    normalizeLiveHtml(
      `<body>ROVER${detection.replace("<script>", '<script nonce="aBc123">')}</body>\n`,
    ),
    expected,
  );
  assert.notEqual(
    normalizeLiveHtml(`<body>Changed${detection}</body>\n`),
    expected,
  );
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
