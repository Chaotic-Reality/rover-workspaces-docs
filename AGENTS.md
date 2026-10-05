# ROVER public documentation and website

Read ROADMAP.md, STATUS.md, BRAND_GUIDELINES.md, and RELEASING.md. This repository
is public. Never copy private application/server source, provider secrets,
private exports, account details, or administration implementation into it.

The canonical documentation is the public Markdown, including USER_GUIDE.md;
the older wiki is not the maintained user-guide source. scripts/site-content.mjs
explicitly registers documents for branded pages under /docs/. Never hand-edit
generated documentation HTML or copy a second version of a document into it.
Product-page source is `web/pages/`, assets are `web/assets/`, and the shared
layout is `scripts/build-site.mjs`. `site/` is the generated deployable output.
Use `npm ci` and `npm run check`; commit generated site changes with their
source. Smoke-test the deployed beta with `npm run smoke`. CI validates the
site but does not deploy it. Keep `admin/` outside the public asset inventory
and undeployed until an owner-approved Access policy is verified.

Use the app's ROVER mark and the shared brand guideline. Describe local,
contract-tested, staging, and live capabilities accurately. Keep completed work
in CHANGELOG.md and future work in ROADMAP.md. Update privacy disclosures when
permissions or data handling change. No paid resources or store publication
without owner approval; beta noindex is not access control.

For every feature, behavior, release, or deployment change, apply the update
matrix in SITE_DEVELOPMENT.md before calling the milestone complete. Update
affected guides and landing-page summaries, STATUS.md for verified capabilities,
CHANGELOG.md for completed work, ROADMAP.md for future work, and privacy/plan
disclosures when relevant. Build and check the website; deploy authorized site
changes and run smoke checks. If deployment is blocked, record the pending
publication and source commit explicitly. Do not describe a local build as live.
