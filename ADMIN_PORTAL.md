# ROVER administration portal

The `admin/` directory is a non-deployed UI shell for the future support and entitlement console. It intentionally contains no account data, provider credentials, payment secrets, workspace exports, or mutation endpoints.

Before this page is hosted:

1. Create a separate `admin.roverworkspaces.com` Worker or Pages project.
2. Put it behind a Cloudflare Access application with an allow policy for the owner's account before the first deployment.
3. Keep the admin project separate from the public product site and the sync Worker.
4. Add read-only health and audit views first. Add grant/revoke actions only after CSRF protection, audit logging, least-privilege roles, and confirmation flows are tested.
5. Keep provider tokens, payment webhooks, and workspace payloads server-side; never put them in static assets.

The current beta site does not link to this shell, and the shell should not be deployed until the Access policy exists.
