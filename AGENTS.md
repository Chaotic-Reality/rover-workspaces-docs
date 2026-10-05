# ROVER public documentation and website

Read ROADMAP.md, STATUS.md, BRAND_GUIDELINES.md, and RELEASING.md. This repository
is public. Never copy private application/server source, provider secrets,
private exports, account details, or administration implementation into it.

The canonical website source is `web/pages/`, `web/assets/`, and the shared
layout in `scripts/build-site.mjs`. `site/` is the generated deployable output.
Use `npm ci` and `npm run check`; commit generated site changes with their
source. Smoke-test the deployed beta with `npm run smoke`. CI validates the
site but does not deploy it. Keep `admin/` outside the public asset inventory
and undeployed until an owner-approved Access policy is verified.

Use the app's ROVER mark and the shared brand guideline. Describe local,
contract-tested, staging, and live capabilities accurately. Keep completed work
in CHANGELOG.md and future work in ROADMAP.md. Update privacy disclosures when
permissions or data handling change. No paid resources or store publication
without owner approval; beta noindex is not access control.
