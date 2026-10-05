# ROVER Workspaces hosting plan

The recommended low-cost setup is Cloudflare for DNS, static hosting, and the future small account service:

- `roverworkspaces.com` for the public product page.
- `docs.roverworkspaces.com` for this documentation site.
- `app.roverworkspaces.com` for a future customer account and billing handoff.
- `admin.roverworkspaces.com` for a private support and entitlement console protected by Cloudflare Access.
- `roverws.com` for redirects and short campaign links.

Cloudflare Pages can deploy from GitHub and create preview deployments for branches and pull requests. Cloudflare Workers and D1 provide a low-cost path for the future entitlement ledger, but no account service or paid checkout is connected yet.

The first static beta site is live at [rover-workspaces-beta.tech-e40.workers.dev](https://rover-workspaces-beta.tech-e40.workers.dev). It is deployed from the `site/` directory with the free Cloudflare Pages/Workers path. Future updates from this repository can use `npx wrangler deploy` from the docs repository; custom domains can be attached later without changing the site content.

The future admin console is kept separately in `admin/` and is not deployed with the public site. It must be placed behind a Cloudflare Access allow policy before any admin route or data view is published. See [ADMIN_PORTAL.md](ADMIN_PORTAL.md).

See the private repository's hosting plan for implementation details and the manual Cloudflare setup steps. Keep payment secrets, workspace exports, and administrator credentials out of this public repository.
