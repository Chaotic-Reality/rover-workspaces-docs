# ROVER Workspaces release notes

ROVER Workspaces is in development. These notes describe development builds, not browser-store availability. Live Chrome and Edge acceptance remains a release gate.

## Unreleased

- Deploy the local encrypted-manifest and durable-queue Worker/D1 contract to a
  free Cloudflare staging Worker for development testing; hosted activation,
  key recovery, R2 storage, and production sync remain disabled.
- Add a local named-profile store with stable IDs and explicit create, rename,
  and delete behavior; browser and account identity remain separate.
- Add explicit browser-profile mappings that use opaque installation IDs and
  never infer a ROVER profile from a label or email.
- Add a portability identity-binding contract that keeps purchaser, ROVER
  profile, browser mapping, device, and provider account references separate.
- Add local active-profile switching and linked-device records; unlinking removes
  only the link and preserves local workspace data.
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
