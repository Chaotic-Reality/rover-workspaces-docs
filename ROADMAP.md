# ROVER Workspaces roadmap

This roadmap lists planned work only. Completed work is recorded in the [change history](CHANGELOG.md). ROVER Workspaces is currently in development; Chrome and Edge are the supported release targets, and live browser acceptance remains a release gate. Plans may change and do not promise delivery dates.

## Priority 1 — release gate and local Pro foundation

These items make the local product ready for a public release and prepare paid features without connecting a payment provider yet.

- [ ] Complete live Chrome and Edge acceptance for the current release candidate, including upgrade, restore, import/export, responsive layout, icons, and conflict scenarios.
- [ ] Verify final extension icon appearance in installed Chrome and Edge and capture store listing screenshots.
- [ ] Recheck permissions, privacy disclosures, dependency notices, reviewer steps, and package checksums against the release candidate.
- [ ] Validate demand for version history, Custom Templates, organization rules, workspace combining, and opt-in sync with a small pilot.
- [x] Implement local entitlement simulation: `free`, `trial`, `pro-local`, `pro-sync`, and `expired`.
- [x] Add a 15-day full-feature trial with clear start/end dates and no account requirement until activation.
- [x] Limit Free to two workspaces while keeping existing data viewable, exportable, renameable, and deletable after trial expiry.
- [x] Keep local capture, editing, import/export, and restore available after trial expiry.

## Priority 2 — first paid value

- [x] Add reusable Custom Templates with project placeholders and a resolved preview.
- [x] Add local organization rules and duplicate cleanup with a reviewable dry run.
- [x] Extend local snapshots with selective tab/group recovery and revision comparison.
- [x] Add scheduled capture.
- [x] Add configurable local snapshot retention.
- [x] Publish pricing, refund, privacy, support, cancellation, and trial terms.

## Priority 3 — licensing and subscriptions

- [x] Select a hosted checkout/licensing provider for implementation planning: Paddle is the first choice, with Lemon Squeezy as fallback and Stripe as a later comparison; no account is connected.
- [ ] Connect the tested entitlement ledger core to a hosted Worker/D1 endpoint driven by signed purchase, renewal, cancellation, refund, and chargeback events.
- [x] Define and test the provider-neutral Worker/D1 adapter contract without deploying paid infrastructure.
- [x] Test the provider-event status transitions and idempotent/stale handling in the local ledger core.
- [x] Build and test the provider-neutral entitlement ledger core with signature verification, idempotency, stale-event protection, and auditable grants.
- [x] Keep the license tied to the purchaser account, not a browser, device, browser profile, or ROVER sync profile.
- [x] Support auditable gifted, promotional, support, and pilot Pro grants with optional expiration and no payment event required.
- [x] Define and test account-bound activation across Chrome and Edge with a short-lived signed entitlement and documented offline grace.
- [ ] Connect browser activation to hosted account sign-in and token issuance.
- [x] Build and test the short offline-grace policy for a previously verified entitlement.
- [x] Test trial expiry, renewal, failed payment, cancellation, refund, chargeback, account recovery, duplicate webhooks, and provider outages in local simulation and adapter tests.
- [ ] Re-run the lifecycle matrix against a hosted provider sandbox after billing and Worker deployment are approved.
- [x] Verify releases do not place payment secrets, provider credentials, webhook handlers, or authoritative paid flags in extension code.

## Priority 4 — user-owned backups

Implement one provider at a time so users own the storage and ROVER's initial operating cost stays low.

- [ ] Add Google Drive backup using the hidden `appDataFolder` and minimum required permissions.
- [x] Define and test the Google Drive `appDataFolder` adapter contract without connecting credentials or uploading user data.
- [ ] Add OneDrive backup using the dedicated application folder and minimum Microsoft Graph permissions.
- [x] Define and test the OneDrive application-folder adapter contract without connecting credentials or uploading user data.
- [ ] Use OAuth 2.0 authorization code flow with PKCE, `S256`, state validation, account switching, token revocation, and no client secrets in the extension.
- [x] Define and test the provider-neutral PKCE/state/revocation contract without registering provider credentials.
- [ ] Add visible connect, disconnect, reauthorize, backup, restore, and delete controls.
- [x] Define and test provider connection, reauthorization, and disconnect state without deleting local workspace data.
- [ ] Encrypt backup payloads before upload and never sync cookies, passwords, authentication sessions, or general browser history.
- [x] Define and test the client-side AES-GCM backup envelope; keep key storage/recovery and upload wiring separate.
- [ ] Test provider rate limits, revoked access, expired tokens, partial failures, and interrupted uploads.
- [x] Define and test provider failure classification and bounded retry behavior for rate limits, authorization expiry, outages, and interrupted uploads.

## Priority 5 — named profiles and portability

- [ ] Add user-named profiles such as Personal, Work, Scouts, and Client projects.
- [ ] Let users explicitly map Chrome Work, Edge Work, and other browser installations to a selected ROVER profile.
- [ ] Keep purchaser identity, ROVER profile, browser profile, device, and provider account as separate records.
- [ ] Add profile switching, linked-device management, conflict previews, unlinking, and cloud deletion without deleting local data.
- [ ] Support opt-in cross-browser/device sync without matching profiles by display name or email.

## Priority 6 — ROVER-hosted sync and later capabilities

- [ ] Evaluate Cloudflare Workers, D1, and R2 for encrypted ROVER-hosted sync only after provider backup demand is validated.
- [ ] Add client-side encryption, quotas, retention, key recovery, tombstones, and offline queues before hosted sync launches.
- [ ] Evaluate team workspaces, shared templates, and administration after individual Pro usage is validated.
- [ ] Evaluate sponsorship only as clearly labeled, non-personalized content; do not use browsing activity, workspace contents, or survey answers for targeting.
- [ ] Add other Chromium browsers only when customer demand justifies the maintenance cost.

## Launch learning

- [ ] Offer a short, skippable onboarding survey with a separate explicit submit action.
- [ ] Offer a feedback prompt after several days of actual use with Later and Do not ask again choices.
- [ ] Provide a private feedback channel with retention, deletion, abuse protection, and restricted administration.
- [ ] Review Chrome and Edge store policies before enabling any sponsorship, cloud upload, or paid feature.

## Working approach

Finish and verify one milestone at a time. Commit each milestone, let CI check it, and update the change history when it ships. Retain existing user workspaces throughout upgrades.
