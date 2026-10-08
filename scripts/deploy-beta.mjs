import { access } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// The private deployment includes the security handler. Do not replace it with
// an assets-only deploy, which would discard per-response security headers.
const privateRepo = fileURLToPath(
  new URL("../../rover-workspaces/", import.meta.url),
);
await access(
  new URL("../../rover-workspaces/wrangler.beta-site.jsonc", import.meta.url),
);
execFileSync(
  process.execPath,
  [
    "--test",
    "scripts/render-document.test.mjs",
    "scripts/smoke-content.test.mjs",
  ],
  { stdio: "inherit" },
);
execFileSync(process.execPath, ["scripts/build-site.mjs"], {
  stdio: "inherit",
});
execFileSync(process.execPath, ["scripts/check-site.mjs"], {
  stdio: "inherit",
});
execFileSync(process.execPath, ["scripts/test-beta-site.mjs"], {
  cwd: privateRepo,
  stdio: "inherit",
});
execFileSync(process.execPath, ["--test", "scripts/test-beta-support.mjs"], {
  cwd: privateRepo,
  stdio: "inherit",
});
execFileSync(process.execPath, ["scripts/test-beta-runtime.mjs"], {
  cwd: privateRepo,
  stdio: "inherit",
});
execFileSync(
  process.execPath,
  [
    "node_modules/wrangler/bin/wrangler.js",
    "deploy",
    "--config",
    "wrangler.beta-site.jsonc",
  ],
  {
    cwd: privateRepo,
    stdio: "inherit",
  },
);
