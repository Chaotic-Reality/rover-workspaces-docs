# ROVER Workspaces release notes

ROVER Workspaces is in development. These notes describe development builds, not browser-store availability. Live Chrome and Edge acceptance remains a release gate.

## Unreleased

## 0.3.7 — development testing build

- Add Check for updates beside the sidebar version. Manual testing builds open
  the protected beta page to compare their installed version with the beta server
  build. ZIP updates remain manual and are supplied by the maintainer.
- Show browser-reported pending updates with explicit reload confirmation,
  and a dismissible What's new notice after a version upgrade. Finish open
  dialogs and operations before reloading. No background version polling or new
  extension permissions are added. Store delivery still requires store publication.

## 0.3.6 — development testing build

- Show the installed release version directly in the sidebar's About link.

Version 0.3.6 includes the reviewed **Update from current tabs** workspace
action described below. The app's About page and browser extension details
show this version after updating and reloading the existing installation.
This is a personal testing build, not a browser-store release. Account sign-in
remains disabled pending extension integration and live provider acceptance.

- Add **Update from current tabs** to workspace cards: review a current-window
  capture before replacing saved tabs and groups, preserve workspace identity
  and organization, and undo the update. Empty captures and concurrent edits
  are rejected. Installed Chrome/Edge acceptance remains required.

- Connect extension approval and exchange to the beta host behind separate
  disabled configuration. Isolated runtime tests verify signed tester access,
  protected approval, one-time redemption, independent session revocation,
  native rate limits and rejection of incomplete extension configuration.
  Live sign-in remains disabled; browser transport and consent are still required.

- Prepare and test the private one-time extension exchange with strict origin,
  tester authentication, rate and request checks. Concurrent redemption returns
  one registered session; invalid requests and replay are rejected. The adapter
  remains unmounted pending browser transport and host integration acceptance.

- Prepare and test extension sign-in approval with explicit consent, protected
  same-origin actions, approved extension IDs and fixed return addresses.
  One-time codes are bound to the approved extension and requesting installation.
  This remains isolated preparation; live sign-in is disabled pending integration.

- Improve automated-check reliability by running browser-interface tests in
  separate processes while retaining automatic discovery and failure reporting.
  All 222 application tests and the production build passed the full check.
  Account sign-in remains disabled; this changes development tooling only.

- Add and verify the private one-time extension handoff core using isolated
  database tests for proof/installation binding, concurrent redemption, replay,
  expiry and source-session revocation. HTTP and extension integration remain
  pending; deployed account sign-in is still disabled.

- Prepare a separate beta account database with empty identity and session
  tables. Keep account migrations separate from workspace sync migrations and
  retain disabled sign-in until the handoff and provider consent are verified.

- Verify the actual beta host with account sign-in enabled in an isolated runtime:
  signed tester/provider assertions, temporary database, cross-tester and replay
  rejection, session revocation and native rate limiting. No live credentials or
  provider requests are used; deployed sign-in remains disabled.

- Prepare beta-host account routing behind a disabled feature flag and add an
  explanatory Account page to shared navigation. Verify tester authentication
  and disabled-route behavior in the server runtime, keep provider buttons
  disabled, and suppress callback query strings in stored invocation logs.
  No live provider connection or account database is enabled by this change.

- Add a tested private account HTTP adapter with protected host cookies,
  same-origin CSRF checks, tester-bound callbacks, session registration, and
  sign-out. The isolated server/database flow passes with signed provider tokens;
  host mounting and live provider consent remain pending.

- Add hashed server session registration with immediate revocation, expiry
  enforcement, and isolation between sessions and accounts. Unit and isolated
  database runtime checks verify sign-out without retaining bearer tokens.
  Hosted sign-out and live account sign-in remain to integrate.

- Update the pinned development/deployment tools and source-map dependency to
  address reported dependency vulnerabilities. Existing Cloudflare resources,
  compatibility settings, and extension permissions remain unchanged.

- Add server-side Google and Microsoft identity verification with real signed
  tokens, tenant restrictions, browser-bound one-time sign-in transactions,
  and race-safe account creation. Isolated tests verify replay rejection and
  account separation. Live callbacks and account sync remain unavailable while
  hosted cookies, revocable sessions, extension handoff, and consent are completed.

- Add branded Report a bug and Issue updates pages with status filters,
  pagination, descriptions, and comments. The extension's About page links to
  them. The server submission flow verifies tester sign-in, publication consent,
  form origin/token, size limits, and submission rate; failures retain details.
  Reports are public, with no automatic diagnostics or email publication.
  Configure a server-only credential restricted to this repository's issues;
  live submission, closed status, and comment viewing passed on October 8.
  Use authenticated server reads to avoid shared anonymous GitHub limits,
  verify that the repository is public, and keep those responses out of cache.

- Harden the beta website with HTTPS redirects, TLS 1.2 minimum, per-response
  security nonces for bot detection, stronger indexing exclusions, and an
  approved-tester sign-in gate. Keep administration unavailable and remove
  public preview/alternate website entry points. Owner email-code acceptance
  passed October 8; this gate is separate from future ROVER account sign-in.

- Use `beta.roverworkspaces.com` for the beta website and extension documentation
  links. Centralize the public origin, generate matching canonical page URLs,
  and preserve the beta custom domain in deployment configuration.

- Publish the public Markdown documents as branded website pages with a grouped
  documentation hub, shared navigation, contents links, and responsive tables.
  Product-page and extension About documentation links now use the website; GitHub remains
  available for source history and public issue reporting.
- Adopt a canonical user guide and a required documentation-update matrix for
  features, releases, deployments, privacy, plans, history, and roadmap changes.
  Website checks verify source freshness, registration, links, and public scope.

- Adopt a shared ROVER brand guideline, app logo and acronym, and responsive
  website navigation. Add beta installation instructions and truthful feature
  status, plans, privacy, and support pages to the free staging website.
- Add Free Full local backup with validated replacement preview, preserving
  workspace ordering, collections, favorites, appearance, Custom Templates,
  and revisions. Credentials and licensing are excluded; scheduled capture
  remains disabled after replacement.
- Extract sidebar initialization and add regression coverage for optional
  links, collection sorting, accordion behavior, and persisted preferences.
- Harden staging request limits, entitlement and profile/device consent,
  concurrent manifest and ledger writes, and identity validation. Verify the
  deployed Worker bundle against isolated D1 runtime tests. Live identity,
  provider backups, and multi-user sync remain disabled.
- Consolidate future work into ROADMAP.md and engineering evidence into
  STATUS.md; add repository instructions and a reusable ChatGPT handoff prompt.

- Deploy the local encrypted-manifest and durable-queue Worker/D1 contract to a
  free Cloudflare staging Worker for development testing; hosted activation,
  key recovery, R2 storage, and production sync remain disabled.
- Connect the provider-neutral entitlement ledger to the same free staging
  Worker/D1 endpoint with signed webhook verification and account lookup;
  billing-provider credentials and hosted browser activation remain disabled.
- Add and smoke-test a protected staging-only activation-token route backed by
  the D1 entitlement ledger; hosted account sign-in remains disabled.
- Add a tested provider-neutral account-session contract so a future hosted
  identity adapter can issue short-lived sessions without putting identity
  provider secrets in the extension.
- Select Google and Microsoft as the supported ROVER sign-in providers; OAuth
  registrations and hosted callbacks remain pending.
- Add tested Google/Microsoft OIDC claim normalization with audience, nonce,
  issuer, and time validation; provider credentials remain unconfigured.
- Add a short-lived, one-time OAuth transaction boundary that retains PKCE
  verifier and state only until the callback is consumed or expires.
- Document the closed-beta release track, package-sharing path, isolated
  Cloudflare environments, and beta exit criteria.
- Make the desktop sidebar navigation scroll within its available height so
  settings, information, and quick actions cannot overlap at shorter viewports.
- Sort collections alphabetically in the sidebar and workspace-card selectors,
  keeping `No collection` as the default option.
- Add mutually exclusive Collections and Quick Actions accordion sections with
  triangle indicators across viewports; the outer sidebar no longer adds a
  second scrollbar, while long collection lists retain their own scroll area.
- Add a compact short-viewport sidebar mode that tightens navigation spacing,
  keeps the footer anchored, and scrolls the middle navigation before links can
  overlap.
- Fix the collapsed Quick Actions state so every action link hides with its
  section header instead of leaving the buttons visible.
- Start Collections and Quick Actions collapsed; opening either section still
  closes the other, while both may remain closed.
- In compact mode, remove the duplicate uppercase Quick Actions label so the
  arrow button is the single section heading.
- Use one sidebar-navigation scrollbar for longer collection lists at every
  desktop viewport instead of nesting a collection scrollbar inside it.
- Remove the duplicate uppercase Quick Actions label; the accordion button is
  the single heading for that section.
- Remove the duplicate uppercase Collections label for the same single-heading
  accordion treatment.
- Remove the standalone Prioritized roadmap sidebar link; the roadmap remains
  available from the About page.
- Remove the stale icon-decoration reference left by that link removal so
  startup continues into stored workspace and appearance loading.
- Add the first free-tier beta product site with product, how-it-works,
  privacy, plans, and support pages at the Cloudflare Pages/Workers URL.
- Add a non-deployed administration portal shell and Access-first hosting
  boundary for future entitlement, provider, health, and support views.
- Keep the beta site out of search indexing and add a friendly static 404 page.
- Record the current Chrome Web Store and Microsoft Edge Add-ons policy review,
  including privacy, Limited Use, paid-feature, and third-party purchase rules.
- Verify the 0.3.5 release package manifest, permissions, dependency notices,
  ZIP inventory, and file checksums with the local release checks; installed
  Chrome and Edge review remains required before store submission.
- Add a tested provider-code exchange boundary that resolves an account and
  issues a short-lived ROVER session without connecting live callbacks.
- Connect browser activation to a verified hosted account session so Chrome and
  Edge activations remain bound to the purchaser account; staging still uses
  its fixed token until identity providers are registered.
- Add provider-neutral encrypted backup transfer wiring that encrypts before
  upload and decrypts only in the extension; provider credentials and key
  recovery remain pending.
- Add tested provider-specific Google Drive and OneDrive PKCE authorization
  configuration with narrow app-data and app-folder scopes.
- Add provider backup control hooks for connect, reauthorize, disconnect,
  backup, restore, and delete while keeping them safely disabled until OAuth
  registration and account consent are configured.
- Add a local named-profile store with stable IDs and explicit create, rename,
  and delete behavior; browser and account identity remain separate.
- Add explicit browser-profile mappings that use opaque installation IDs and
  never infer a ROVER profile from a label or email.
- Add a portability identity-binding contract that keeps purchaser, ROVER
  profile, browser mapping, device, and provider account references separate.
- Add local active-profile switching and linked-device records; unlinking removes
  only the link and preserves local workspace data.
- Add a profile-to-profile transfer planner with safe copy defaults, explicit
  replace/merge destinations, previewable results, and source preservation.
- Add metadata-only conflict previews and an explicit cloud-deletion request
  contract that guarantees local data preservation.
- Add an opt-in sync-consent contract tied to explicit profile, device, and
  browser-mapping IDs, with revocation and no email or display-name matching.
- Document the Cloudflare Workers, D1, and R2 hosted-sync evaluation; no
  account, deployment, bucket, or paid service is connected.
- Add tested local sync-policy boundaries for encrypted-object quotas,
  retention tombstones, bounded offline operations, and key-recovery metadata.
- Add a local Worker/D1 sync contract for authenticated encrypted manifests and
  durable queue operations, with an in-memory test store and no deployment.
- Add lifecycle coverage for purchase, renewal, past-due, cancellation, refund, chargeback, and expiration events.
- Add a tested, provider-neutral Worker/D1 entitlement adapter contract for signed webhooks and account lookup.
- Add cross-browser activation coverage proving Chrome and Edge can share one account-bound entitlement token.
- Complete the local licensing lifecycle matrix, including trial expiry, payment state changes, recovery, duplicate delivery, and offline provider outage behavior.
- Add a release-boundary scan that rejects server-only billing and ledger terms from the extension bundle.
- Add a tested Google Drive `appDataFolder` adapter contract with narrow scope and injectable transport.
- Add a tested OneDrive application-folder adapter contract with minimum Graph scope and injectable transport.
- Add a tested OAuth 2.0 PKCE helper with S256 challenges, state validation, account switching, and token revocation.
- Add a tested local backup-connection boundary for provider switching, reauthorization, and token cleanup.
- Add visible, safely disabled cloud backup controls with provider status in Appearance & settings.
- Add a versioned AES-GCM-256 backup envelope with round-trip and wrong-key tests.
- Add bounded provider retry and failure classification tests for backup reliability.
- Add a local entitlement state model for Free, 15-day Trial, Pro Local, Pro Sync, and Expired without connecting payment or cloud services.
- Show local entitlement status, offer the 15-day trial, and enforce the two-workspace Free creation limit without blocking exports or existing data.
- Add local Custom Templates with named project placeholders, resolved previews, and apply/save controls.
- Gate Custom Templates, organization rules, workspace history, and workspace combining with clear ROVER Pro upgrade messaging.
- Complete the local 15-day full-feature trial flow and preserve the core local workflow after trial expiry.
- Add Pro scheduled local capture with a daily time setting and browser alarm scheduling.
- Publish pre-release pricing, privacy, support, cancellation, refund, and trial disclosures.
- Select Paddle as the first hosted checkout/licensing provider for planning, with Lemon Squeezy retained as fallback; no payment account is connected.
- Add a provider-neutral entitlement ledger core with signed-event verification, duplicate protection, stale-event handling, and gifted grant support.
- Add account-bound short-lived activation tokens with separate browser, device, and ROVER profile metadata.
- Require grant issuer, reason, ID, and optional expiration for auditable non-payment Pro access.
- Add a tested 72-hour offline-grace policy for previously verified account entitlements.
- Add a local setting for retaining 5–50 revisions per workspace.
- Add card-level organization previews for duplicate URLs, empty groups, and trimmed group names before local changes are saved.
- Add selective opening of groups and tabs from an older workspace revision without replacing the current saved workspace.
- Keep recent local workspace revisions with comparison and whole-revision recovery from each workspace card.
- Save the current tab or tab group directly from the browser context menu.
- Preview browser bookmark HTML and pasted URL-list imports before adding, replacing, or merging workspaces.

## 0.3.5

- Consistent outline icons for navigation and templates.
- Roadmap and About grouped at the bottom of the left navigation.
- Plain-language privacy statement and proprietary license statement, linked from About.

## 0.3.4

- Replace placeholder extension icons with blue-grey artwork depicting a browser window and nested groups.
- Generate consistent 16, 32, 48, and 128 pixel icons with transparent rounded corners; validate packaged PNG dimensions during builds.
- Installed-browser icon checks and final store screenshots remain pending.

## 0.3.3

- About links to the current privacy/data-handling document and support guide.
- Build verification checks that bundled runtime license notices match the installed dependency versions and license texts. Final store disclosures and installed-browser acceptance remain release gates.

## 0.3.2

- Import JSON/YAML as copies, replacements, or merges after choosing destinations and reviewing before/after counts.
- Imports save as one operation. A destination changed since review blocks the entire import, preserving the latest saved data.
- Replacements retain the destination identity and use imported contents. Merges preserve every window, group, and duplicate tab.

## 0.3.1

- Manager shortcuts: / focuses search, Alt+Shift+C captures, and Alt+Shift+R restores the single selected workspace after confirmation. Shortcuts pause while typing or using dialogs.
- Group emoji picker and locally generated workspace previews. No page images are fetched.

## 0.3.0

- Merge into an existing workspace with a preview, revision protection, and safe undo.
- Select multiple workspace cards for combine and export.
- Favorites and Recently opened views, stored locally and separately from exports.
- An About page with version, ownership, privacy information, documentation, and issue links.
- Collections, appearance settings, storage usage, and collapsible navigation.
- Clean/Modern styles, light/dark/system colors, custom accents, and density controls. See [appearance notes](APPEARANCE.md).

## 0.2.3

- Move product documentation and the roadmap to this public repository.

## 0.2.2

- Dotted insertion indicators show where dragged groups and tabs will land.

## 0.2.1

- Collapse and expand groups in the editor.
- Automatic scrolling during dragging and a fixed drop target for the last group position.

## 0.2.0

- Nested group editing, keyboard movement, and drag-and-drop ordering.
- Nested JSON/YAML exports with support for legacy imports.
- Combine workspaces and add templates to existing workspaces.
- Blue-grey styling and sidebar shortcuts.

## Implementation records moved from the roadmap — October 5, 2026

These completed development records retain their original contract/staging
qualifications. They are not evidence of live account sync or store acceptance;
see [STATUS.md](STATUS.md) for the remaining integration gates.

- Resolve responsive sidebar overflow and overlap with mutually exclusive Collections and Quick Actions sections, one middle-navigation scroll area, and a compact short-viewport mode; installed-browser acceptance remains a release gate.
- Verify the release package manifest, permissions, dependency notices, ZIP inventory, and file checksums with the local package checks.
- Implement local entitlement simulation: `free`, `trial`, `pro-local`, `pro-sync`, and `expired`.
- Add a 15-day full-feature trial with clear start/end dates and no account requirement until activation.
- Limit Free to two workspaces while keeping existing data viewable, exportable, renameable, and deletable after trial expiry.
- Keep local capture, editing, import/export, and restore available after trial expiry.
- Add reusable Custom Templates with project placeholders and a resolved preview.
- Add local organization rules and duplicate cleanup with a reviewable dry run.
- Extend local snapshots with selective tab/group recovery and revision comparison.
- Add scheduled capture.
- Add configurable local snapshot retention.
- Publish pricing, refund, privacy, support, cancellation, and trial terms.
- Select a hosted checkout/licensing provider for implementation planning: Paddle is the first choice, with Lemon Squeezy as fallback and Stripe as a later comparison; no account is connected.
- Connect the tested entitlement ledger core to the free staging Worker/D1 endpoint, protected by signed provider-event verification; no billing provider is connected.
- Define and test the provider-neutral Worker/D1 adapter contract without deploying paid infrastructure.
- Test the provider-event status transitions and idempotent/stale handling in the local ledger core.
- Build and test the provider-neutral entitlement ledger core with signature verification, idempotency, stale-event protection, and auditable grants.
- Keep the license tied to the purchaser account, not a browser, device, browser profile, or ROVER sync profile.
- Support auditable gifted, promotional, support, and pilot Pro grants with optional expiration and no payment event required.
- Define and test account-bound activation across Chrome and Edge with a short-lived signed entitlement and documented offline grace.
- Deploy and smoke-test a staging-only token issuance contract against the free Worker/D1 ledger; it remains fixed to the staging account.
- Define and test a provider-neutral account-session contract for a future hosted identity adapter; no identity provider is connected.
- Select Google and Microsoft sign-in as the supported ROVER identity providers; registrations and credentials remain pending.
- Define and test Google/Microsoft OIDC claim normalization with audience, nonce, issuer, and time validation; provider registrations remain pending.
- Define and test the provider-code exchange and ROVER session issuance boundary; live provider callbacks remain pending.
- Connect browser activation to a verified hosted account session and account-bound token issuance; provider registration and production credentials remain pending.
- Build and test the short offline-grace policy for a previously verified entitlement.
- Test trial expiry, renewal, failed payment, cancellation, refund, chargeback, account recovery, duplicate webhooks, and provider outages in local simulation and adapter tests.
- Verify releases do not place payment secrets, provider credentials, webhook handlers, or authoritative paid flags in extension code.
- Define and test the Google Drive `appDataFolder` adapter contract without connecting credentials or uploading user data.
- Define and test the OneDrive application-folder adapter contract without connecting credentials or uploading user data.
- Define and test the provider-neutral PKCE/state/revocation contract without registering provider credentials.
- Add and test a short-lived, one-time browser OAuth transaction store that consumes callbacks safely and rejects expiry or provider denial.
- Define and test provider-specific Google Drive and OneDrive authorization configuration; client registrations remain pending.
- Add visible connect, disconnect, reauthorize, backup, restore, and delete control shells with safe disabled behavior before provider registration.
- Define and test provider connection, reauthorization, and disconnect state without deleting local workspace data.
- Render safe provider status and disabled backup controls before provider registration is approved.
- Encrypt backup payloads before upload and never sync cookies, passwords, authentication sessions, or general browser history; key recovery remains separate.
- Define and test the client-side AES-GCM backup envelope; keep key storage/recovery and upload wiring separate.
- Define and test provider failure classification and bounded retry behavior for rate limits, authorization expiry, outages, and interrupted uploads.
- Add user-named profiles such as Personal, Work, Scouts, and Client projects.
- Let users explicitly map Chrome Work, Edge Work, and other browser installations to a selected ROVER profile.
- Keep purchaser identity, ROVER profile, browser profile, device, and provider account as separate records.
- Add local profile switching and linked-device management with unlinking that preserves local data.
- Add conflict previews and explicit cloud deletion without deleting local data.
- Define and test opt-in cross-browser/device sync consent without matching profiles by display name or email; live account sync is not enabled.
- Define and test a profile-to-profile transfer planner for selected copy, replace, and merge operations; source data is preserved by default.
- Evaluate Cloudflare Workers, D1, and R2 for encrypted ROVER-hosted sync only after provider backup demand is validated.
- Define and test client-side encryption, quotas, retention, key recovery, tombstones, and offline-queue policy boundaries.
- Define and test the Worker/D1 encrypted-manifest and durable-queue contract locally.
- Deploy the local contract to a free staging Worker/D1 environment for development testing.
- Review current Chrome and Edge store policies before enabling sponsorship, cloud upload, or paid features; repeat the review before submission or any material data-policy change (see [STORE_POLICY_REVIEW.md](STORE_POLICY_REVIEW.md)).
