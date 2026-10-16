# Google-first beta readiness

Updated October 16, 2026. This is the execution checklist for a fully functional
invited beta, not a declaration that cloud services or subscriptions are live.
Use [feature status](STATUS.md) for verified evidence and [roadmap](ROADMAP.md)
for remaining work. Completed milestones move into [change history](CHANGELOG.md).

## Scope and current starting point

Phase one targets Chrome Web Store distribution, Google account sign-in and
Google Drive backup. Cloudflare remains the existing ROVER website/API backend;
this does not move hosting to Google Cloud. Google sign-in authenticates the
person, Drive permission permits backup, ROVER licensing controls Pro access,
and a separate checkout provider will handle subscriptions.

Microsoft sign-in and OneDrive are phase two. Keep existing local compatibility
but do not let Edge-store or Microsoft setup block the Google beta.

Website Google sign-in/sign-out are owner-verified. The current 0.3.10 extension
has a registered-installation connection flow, but installed-browser acceptance
is still pending. Grant persistence and sync/backup contracts have isolated
tests; live grants, admin management, payments, Drive and account sync are not
enabled. The current website tester gate is separate from all of those services.

## 1. Reliable account connection

- [ ] Verify installed Chrome sign-in, explicit connection approval, connection
  status, cancellation, expiry and independent website/browser sign-out.
- [ ] Verify real extension requests through Access, including blocked cookies,
  redirects and expired website access; do not bypass the gate to hide failures.
- [ ] Add renewable, revocable sessions with rotation/reuse protection and safe
  browser restart behavior. The current 15-minute session is not persistent login.
- [ ] Show the connected person and verified plan/expiry in the app. Avoid
  presenting cached or offline-unverified state as a freshly verified license.
- [ ] Define account deletion, device removal, access revocation and recovery.

**Owner:** run the exact packaged-browser acceptance checklist and approve live
Google consent. Registration and website login alone do not complete app login.

## 2. Protected owner management

- [ ] Verify a separate owner-only admin hostname/access policy and MFA before
  deploying the prepared admin shell. A tester allowlist is not admin authority.
- [ ] Add account lookup and read-only plan/device/connection status first.
- [ ] Add complimentary Pro Local/Pro Sync grants with optional expiry, reason,
  audited operator identity and targeted revocation; prevent duplicate actions.
- [ ] Protect mutations with server authorization, CSRF checks, confirmation and
  rate limits. Do not trust posted account/operator names or a browser paid flag.
- [ ] Apply the prepared grant migration only after management/read-path checks.
- [ ] Define audit retention/deletion and update privacy before collecting data.

**Owner:** approve the admin identity/hostname and verify protected access. Code
and isolated lifecycle tests can proceed independently of that live deployment.

## 3. Authoritative Pro and Free behavior

- [ ] Derive license reads from the authenticated ROVER account; connect those
  results to local feature gates and server-side cloud authorization.
- [ ] Define how paid subscriptions, complimentary grants and trials combine;
  revoking a gift must not erase a valid paid subscription, or vice versa.
- [ ] Grant invited testers complimentary Pro without requiring payment.
- [ ] Add Test Free Mode and Use Pro access for authorized testers. Free mode
  masks capabilities without changing the grant or deleting saved workspaces.
- [ ] Returning to Pro must require valid access; Test Free Mode is not an unlock.
- [ ] Define offline grace, stale-license behavior, expiration and revalidation.
  Existing data remains readable/exportable when a plan ends.
- [ ] Verify upgrade prompts, limits, trial lifecycle and local/remote revocation.

## 4. Payment and subscription provisioning

- [ ] Choose and onboard the payment provider; use a sandbox first. Paddle
  remains a planning candidate, not an activated merchant account.
- [ ] Create monthly/annual products and approved prices, terms and refund rules.
- [ ] Bind checkout to the signed-in ROVER account on the server. Never activate
  Pro solely from a checkout return URL or client-side success message.
- [ ] Verify signed webhooks, idempotency, retries, reconciliation and out-of-order
  events for purchase, renewal, payment failure, cancellation, refund and dispute.
- [ ] Provide customer billing management, invoices and cancellation links.
- [ ] Keep payment/grant records authoritative and separate from browser profiles.
- [ ] Test purchase/grant combinations, account recovery and support procedures.
- [ ] Obtain explicit owner approval before live payment activation or charges.

Complimentary tester provisioning can ship before paid checkout. Store
installation does not by itself provision a ROVER subscription. See the
[payment integration documentation](https://developer.paddle.com/build/).

## 5. Google Drive backup

- [ ] Request Drive permission separately from basic sign-in, using the narrow
  application-data scope. Do not request access to the user's entire Drive.
- [ ] Implement secure token storage, refresh, account switching, disconnect and
  revoked-consent handling. Review OAuth Testing-mode token lifetime limitations.
- [ ] Encrypt backup contents before upload and define key recovery, rotation and
  lost-key behavior. Keep authentication credentials out of backups.
- [ ] Implement backup listing, create/download/delete, retention, integrity and
  restore preview. Explain that the hidden app folder is not visible in Drive UI.
- [ ] Verify a second Chrome profile can restore an authorized backup without
  silently replacing its existing workspace library.
- [ ] Test quotas, expired/revoked tokens, partial uploads, cancellation, offline
  recovery and user deletion of app data. Keep ordinary local exports available.

Google's [app-data guide](https://developers.google.com/workspace/drive/api/guides/appdata)
describes the hidden app folder and its dedicated scope. Backup is a recovery
copy; it is not automatically a continuous multi-device sync service.

## 6. Named profiles and continuous sync

- [ ] Keep the person, ROVER Home/Work/Scouts profile, browser installation,
  device and connected Drive account as separate identifiers.
- [ ] Let users choose exactly which ROVER profile each browser installation
  links to; default to no sync and explicit profile/device consent.
- [ ] Provide retrieve/copy/merge from another linked profile with a preview.
- [ ] Wire the live beta sync service to real sessions and Pro Sync entitlement;
  never distribute the fixed development staging credential.
- [ ] Finish client encryption, key recovery and the encrypted object-storage
  decision within approved costs. Separate beta data from staging/production.
- [ ] Handle revisions, concurrent edits, conflicts, offline queues, retry/backoff,
  interrupted operations and deletion tombstones without resurrecting old data.
- [ ] Add storage/size quotas, retention, full deletion and disconnected-device
  recovery. Turning sync off must not delete local workspaces.
- [ ] Prove an actual two-profile/two-device round trip and account isolation.

## 7. Updates and Chrome tester delivery

- [ ] Complete publisher registration, verification and the store draft.
- [ ] Register the store-assigned extension ID in app/server configuration and
  verify account connection using that identity before final submission.
- [ ] Prepare accurate listing copy, screenshots, promotional assets, permission
  justifications, accessible privacy policy and reviewer access instructions.
- [ ] Configure Private visibility and trusted testers/Google Group. Keep store,
  website and Google OAuth tester lists separately documented.
- [ ] Verify backup/migration from the unpacked installation to the store identity.
- [ ] Publish a version/channel/release-notes manifest and implement infrequent
  checks, Update available, optional reminder cooldown and dismissal.
- [ ] Keep manual checks/offline use and store-versus-unpacked instructions.
  Never fetch or execute remote extension code as an update mechanism.
- [ ] Submit/publish only after explicit owner authorization; verify store updates
  on tester installations after review. Private distribution still needs review.

See [Chrome private distribution](https://developer.chrome.com/docs/webstore/cws-dashboard-distribution).

## 8. Operational and release gates

- [ ] Resolve the intermittent Windows test-worker startup failure. Do not skip
  files, suppress failures or relax timeouts to make the pipeline look green.
- [ ] Run the complete app, identity/grant, Worker, website and release checks.
- [ ] Retain source commit, package checksum, passing CI and browser acceptance
  together; preserve existing storage during upgrades and migrations.
- [ ] Verify HTTPS, bot/security settings, callbacks, reviewer access and any
  browser dangerous-site warning before inviting broader testing.
- [ ] Set free-tier quotas, abuse protection and sanitized monitoring; verify
  that operational logs never retain codes, tokens or private workspace content.
- [ ] Document deployment rollback, database recovery, secret rotation, incident
  response and customer-support ownership. Test recovery rather than assuming it.
- [ ] Complete privacy, terms, Google data-use disclosures, consent, account
  deletion and retention policies against the exact enabled beta capabilities.
- [ ] Exercise two real invited testers through installation, login, gifted Pro,
  Free-mode testing, encrypted backup, restore and opt-in profile sync.

## Delivery order and owner decisions

Deliver a working complimentary-Pro beta first, then Google Drive backup and
named-profile sync. Paid checkout preparation can run alongside those features;
real charges are a separate owner-approved milestone. Microsoft/OneDrive follow
only after the Google path is accepted.

Owner tasks are limited to installed-browser acceptance, publisher registration
and draft ID, protected admin access confirmation, Google consent/verification,
payment merchant onboarding, final commercial/legal decisions and final store
submission approval. Engineering should keep a precise current checklist in
the private owner handoff while working independently on unblocked code/tests.

Keep existing free Cloudflare resources where possible. This checklist does
not approve adding paid services, object storage that requires billing, or
live payment collection. Review real usage and required plans before enabling
any resource that could incur charges.
