# ROVER Workspaces roadmap

This roadmap lists planned work only. Completed work is recorded in the [change history](CHANGELOG.md). ROVER Workspaces is currently in development; Chrome and Edge are the supported release targets, and live browser acceptance remains a release gate. Plans may change and do not promise delivery dates.

## Current work path — account-connected tester beta

Website Google sign-in and sign-out are owner-verified. Implement and accept
these milestones in order before enabling provider backups or hosted sync:

1. [ ] Connect extension sign-in through explicit website approval and the
   installation-bound one-time handoff; verify installed Chrome, then Edge.
2. [ ] Show verified account/session status, license level and applicable expiry
   in the app, with independent browser sign-out and clear offline/expired states.
3. [ ] Connect owner-managed complimentary Pro grants for invited testers, with
   optional expiration, revocation and an audit trail. No payment is required
   for these grants; paid subscriptions remain a separate integration.
4. [ ] Add beta **Test Free Mode** and **Use Pro access** controls. Free mode
   preserves saved data and the real grant; returning to Pro requires a valid
   grant. Testing controls must not enable cloud access or create a license.
5. [ ] Publish a small machine-readable release manifest on the existing website
   containing version, release channel, date, release notes and a safe details
   link. Verify extension access through the beta gate without weakening it.
6. [ ] Add an **Update available** indicator and release-details popup using
   that manifest, with infrequent checks, a reminder cooldown and dismissal.
   Preserve manual checking and offline use; never download or execute remote
   extension code. Store updates and unpacked beta updates have different steps.

These milestones use existing free resources where possible. Testers receive
complimentary Pro when the live account/grant path is ready; website admission
alone does not grant Pro or enable sync.

## Priority 1 — release gate and local Pro foundation

These items make the local product ready for a public release and prepare paid features without connecting a payment provider yet.

- [ ] Complete live Chrome and Edge acceptance for the current release candidate, including upgrade, restore, import/export, responsive layout, icons, and conflict scenarios.
- [ ] Verify final extension icon appearance in installed Chrome and Edge and capture store listing screenshots.
- [ ] Recheck permissions, privacy disclosures, reviewer steps, and final package evidence against the beta/release candidate in installed Chrome and Edge.
- [ ] Validate demand for version history, Custom Templates, organization rules, workspace combining, and opt-in sync with a small pilot.

## Priority 2 — first paid value

- [ ] Validate local Pro controls and the 15-day trial in the invited pilot.

## Priority 3 — licensing and subscriptions

- [ ] Mount hosted callback routes with secure browser cookies, revocable sessions, and a one-time extension handoff; verify the complete flow before enabling sign-in.
- [ ] Complete Google and Microsoft app registrations, final callback/domain setup, and live sign-in with account-bound sessions.
  Google website consent and sign-out are owner-verified; fresh account-menu
  and landing-page acceptance, Microsoft and extension connection remain.
- [ ] Connect an approved payment-provider sandbox and verify purchase, renewal, cancellation, revocation, and complimentary Pro grants before enabling billing.
- [ ] Re-run the lifecycle matrix against a hosted provider sandbox after billing and Worker deployment are approved.

## Priority 4 — user-owned backups

Implement one provider at a time so users own the storage and ROVER's initial operating cost stays low.

- [ ] Add Google Drive backup using the hidden `appDataFolder` and minimum required permissions.
- [ ] Add OneDrive backup using the dedicated application folder and minimum Microsoft Graph permissions.
- [ ] Use OAuth 2.0 authorization code flow with PKCE, `S256`, state validation, account switching, token revocation, and no client secrets in the extension.
- [ ] Enable live provider controls after OAuth registration and account consent.
- [ ] Test provider rate limits, revoked access, expired tokens, partial failures, and interrupted uploads.

## Priority 5 — named profiles and portability

- [ ] Retrieve, clone, or merge selected workspaces from another linked browser profile through the linked-profile UI and hosted sync.

## Priority 6 — ROVER-hosted sync and later capabilities

- [ ] Replace the fixed staging credential with verified user sessions and a profile/device consent UI; test live sync, conflicts, revocation, and account isolation.
- [ ] Add hosted key recovery before launch.
- [ ] Protect the admin hostname with a verified Cloudflare Access policy before deployment.
- [ ] Evaluate team workspaces, shared templates, and administration after individual Pro usage is validated.
- [ ] Evaluate sponsorship only as clearly labeled, non-personalized content; do not use browsing activity, workspace contents, or survey answers for targeting.
- [ ] Add other Chromium browsers only when customer demand justifies the maintenance cost.

## Launch learning

- [ ] Replace the beta submission token with a dedicated GitHub App before a
  larger public rollout; review abuse limits and credential lifecycle.

- [ ] Offer a short, skippable onboarding survey with a separate explicit submit action.
- [ ] Offer a feedback prompt after several days of actual use with Later and Do not ask again choices.
- [ ] Provide a private feedback channel with retention, deletion, abuse protection, and restricted administration.

## Working approach

Finish and verify one milestone at a time. Commit each milestone, let CI check it, and update the change history when it ships. Retain existing user workspaces throughout upgrades.
