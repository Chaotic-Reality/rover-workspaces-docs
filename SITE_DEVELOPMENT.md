# Website development and deployment

Run `npm ci`, then `npm run check`. Public Markdown files are the canonical
documentation. The explicit registry in `scripts/site-content.mjs` generates
each document as a branded `/docs/` page plus a grouped documentation hub.
USER_GUIDE.md is the maintained user guide; the older GitHub wiki is historical.
Edit documents once in Markdown rather than maintaining a separate HTML copy.

Edit product-page summaries in `web/pages/`, shared styles/logo assets in
`web/assets/`, and the common layout in `scripts/build-site.mjs`. The build
writes reviewed HTML into `site/`, with shared navigation, contents links,
responsive tables, and source-history links. Markdown rendering is build-time
only; no browser JavaScript or remote fonts/icons are required.

CI checks rendering behavior, local links and anchors, assets, headings, shared
layout, beta noindex, and the complete public deployment inventory. Each
document records a normalized source fingerprint; checks reject stale pages
and public Markdown missing from the registry. CI also rejects generated output
that differs from the committed source. It does not deploy or require secrets.

## Required updates with project changes

Treat documentation as part of the same milestone as the implementation.
Both repositories' AGENTS.md files require this review before completion.

| Change | Update when applicable |
| --- | --- |
| Feature or user-flow change | USER_GUIDE.md, the affected guide, product-page summary, and CHANGELOG.md. |
| Work completed or priority changed | Move completed scope into CHANGELOG.md; leave future work and remaining acceptance gates in ROADMAP.md. |
| Capability tested or enabled | STATUS.md, preserving local/contract/staging/live distinctions; include evidence and remaining gates. |
| Release/build created | CHANGELOG.md and relevant beta/release instructions; retain exact package/build evidence privately. Never equate packaging with installed-browser acceptance. |
| Deployment/domain/callback changed | STATUS.md, HOSTING.md, identity/beta guidance, and product links; verify actual live URLs and record pending publication if not deployed. |
| Data, permissions, retention, or provider change | PRIVACY.md, its landing-page summary, STORE_LISTING.md, and affected backup/sign-in guides before exposure. |
| Plans, trial, limits, or billing changed | PRICING.md, TERMS.md, plans-page summary, and user guide; planned services stay labeled until verified live. |
| Brand or navigation changed | BRAND_GUIDELINES.md first, then relevant app/site surfaces and checks. |
| New public document | Add its source, URL, group, and description to scripts/site-content.mjs, then build and check. Do not include private or agent-only instructions. |

## Publication workflow

The beta origin is centralized in `scripts/site-config.mjs`. Build metadata and
the default smoke target use that URL; internal navigation remains relative.
For an alternate build origin, set the `ROVER_SITE_URL` environment variable to
an HTTPS origin before building and checking. This variable does not change DNS
or deploy a domain. The private repository's `wrangler.beta-site.jsonc` records
the live custom domains and the security handler; update it when moving the
hosted site. The public `wrangler.jsonc` is for local assets preview only.
The extension keeps its public
documentation origin in private `src/site-links.ts`; update and rebuild it with
domain changes. The authenticated sync API has its own endpoint.

October 7 domain update: the configured beta address is
`https://beta.roverworkspaces.com`. DNS/TLS and full live smoke checks are
required before treating a newly attached hostname as available.
Live content comparison permits only Cloudflare's recognized JavaScript
Detection wrapper added at the edge; unexpected scripts and page changes still
fail. No bot-protection or security setting is disabled by deployment.

1. Inspect Git status in both repositories and identify the documents affected.
2. Update canonical Markdown and any short landing-page summaries.
3. Run `npm run check` in this repository and review the generated pages at
   wide and narrow viewports when layout changes.
4. Commit source and generated `site/` changes together; push the owning repo.
5. For an authorized website update, deploy the existing free beta target and
   run `npm run smoke`. This checks every live page against the local build,
   not just a successful HTTP status.
6. Record deployment evidence in private operations/review notes. If a gate
   prevents deployment, record that the docs are updated locally but not live.

Completed changes belong in history; future scope belongs in the roadmap.
Use STATUS.md for current capability facts instead of duplicating changing
deployment evidence in every guide. Never copy private source or credentials
into this public documentation build.

For an authorized beta deployment use the pinned Wrangler installation:
`npx wrangler whoami`, `npm run deploy:beta`, then `npm run smoke`. The existing
deployment command checks the public build and uses the sibling private
repository's security handler and pinned Wrangler. It must not be replaced
with a public assets-only deployment. No separate Pages project is implied.
`_headers` applies baseline noindex, content security, referrer, and MIME rules;
the private handler generates fresh HTML security nonces and prevents their
reuse through caching. No paid plan upgrade is part of deployment.
`robots.txt` is additional crawler guidance, not a private access boundary.

The beta site now uses an approved-email Cloudflare Access gate. Run
`npm run smoke -- --access-gate` to verify unsigned visitors cannot retrieve
pages or assets. Full content comparison is performed before initial gate
activation; after activation, content and navigation acceptance also require
an approved owner session. Do not add a public bypass for monitoring. The
separate staging API still needs its existing authentication and remains
unrelated to the website gate. Provider-verification pages may need a separate
public surface later; do not quietly exempt beta privacy/terms pages.

Administration files stay outside `site/`. The smoke check requires public
`/admin/` and unknown paths to return 404. Do not deploy the admin shell until
Cloudflare Access has been configured and independently tested.
