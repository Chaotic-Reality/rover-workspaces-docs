import assert from "node:assert/strict";
const base = new URL(
  process.argv[2] || "https://rover-workspaces-beta.tech-e40.workers.dev",
);
for (const page of [
  "/",
  "/how-it-works.html",
  "/beta-install.html",
  "/pricing.html",
  "/privacy.html",
  "/support.html",
]) {
  const response = await fetch(new URL(page, base));
  assert.equal(response.status, 200, page);
  assert(
    (await response.text()).includes('class="wordmark"'),
    `${page}: shared brand missing`,
  );
}
for (const page of ["/admin/", "/not-a-rover-page"])
  assert.equal((await fetch(new URL(page, base))).status, 404, page);
console.log(`Website smoke checks passed: ${base.origin}`);
