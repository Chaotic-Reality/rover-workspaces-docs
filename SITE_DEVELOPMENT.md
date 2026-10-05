# Website development and deployment

Run `npm ci`, then `npm run check`. Edit page bodies in `web/pages/`; edit
shared styles/logo assets in `web/assets/` and the common header/footer in
`scripts/build-site.mjs`. The build writes reviewed static HTML into `site/`.
Navigation and the product lockup are built into every page; no JavaScript or
remote font/icon service is required.

CI checks local links, assets, headings, shared layout, beta noindex, and the
public deployment inventory. It also rejects generated output that does not
match its source. It does not deploy or require Cloudflare secrets.

For an authorized beta deployment use the pinned Wrangler installation:
`npx wrangler whoami`, `npm run deploy:beta`, then `npm run smoke`. The existing
Worker serves `site/` on Cloudflare's free tier. No separate Pages project is
implied. `_headers` applies noindex, content security, referrer, and MIME rules.
`robots.txt` is additional crawler guidance, not a private access boundary.

Administration files stay outside `site/`. The smoke check requires public
`/admin/` and unknown paths to return 404. Do not deploy the admin shell until
Cloudflare Access has been configured and independently tested.
