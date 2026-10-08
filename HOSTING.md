# ROVER Workspaces hosting plan

The recommended low-cost setup is Cloudflare for DNS, static hosting, and the future small account service:

- `roverworkspaces.com` for the public product page.
- `docs.roverworkspaces.com` for this documentation site.
- `app.roverworkspaces.com` for a future customer account and billing handoff.
- `admin.roverworkspaces.com` for a private support and entitlement console protected by Cloudflare Access.
- `roverws.com` for redirects and short campaign links.

Cloudflare Pages can deploy from GitHub and create preview deployments for branches and pull requests. Cloudflare Workers and D1 provide a low-cost path for the future entitlement ledger, but no account service or paid checkout is connected yet.

The beta site's configured address is [beta.roverworkspaces.com](https://beta.roverworkspaces.com), attached to the existing `rover-workspaces-beta` Worker. Public Markdown documentation generates branded pages under `/docs/`; the site is built into `site/`. Its security handler and deployment configuration stay in the sibling private repository. Use `npm run deploy:beta` for an authorized update and `npm run smoke -- --access-gate` to check the approved-tester sign-in boundary. Full content acceptance requires an approved owner session after the gate is active. No paid plan upgrade or separate Pages project is needed for this small beta. See [website maintenance](SITE_DEVELOPMENT.md) for the shared URL setting and live validation.

The future admin console is kept separately in `admin/` and is not deployed with the public site. It must be placed behind a Cloudflare Access allow policy before any admin route or data view is published. See [ADMIN_PORTAL.md](ADMIN_PORTAL.md).

See the private repository's hosting plan for implementation details and the manual Cloudflare setup steps. Keep payment secrets, workspace exports, and administrator credentials out of this public repository.
