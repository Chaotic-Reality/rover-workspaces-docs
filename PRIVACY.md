# Privacy and data handling

Last updated: October 15, 2026. Applies to the current local-only ROVER Workspaces development builds and the protected beta website, owned by Chaotic-Reality. Store availability has not been announced.

## Our privacy statement

ROVER Workspaces helps you organize your tabs without sending your saved workspaces to us. The current extension keeps workspace information and preferences on your device. We do not receive, sell, or use that locally stored workspace data for advertising. No ROVER Workspaces account is required.

You choose when to capture, import, export, or open a workspace. Capture can also be started from the extension context menu. If you explicitly enable daily scheduled capture in settings, the browser alarm runs at the chosen local time and saves a local workspace while the browser is available; Free limits and paid-feature checks still apply. Scheduling is off by default. Exporting creates a file you control; opening a workspace connects your browser to the saved websites. Information you voluntarily post in public support issues is separate from the extension's local data and is publicly visible on GitHub. The details below explain these boundaries and how to remove your local data.

## Account connection preparation

Website pages with account controls send only the HTTPS website origin
as referrer information, never their paths or query strings. This preserves
the browser origin needed for the server's form checks. OAuth callback and
credential-bearing API responses continue to suppress referrer information.

The protected beta Account page offers Google sign-in for approved testers
during live acceptance. This website account test is optional; the extension's
connection remains disabled. It requests only openid, email and profile, not
Google Drive access. Google processes the sign-in under its own policies.

After successful sign-in, ROVER stores Google's provider/issuer/subject binding
and an opaque ROVER account ID in its existing Cloudflare database. It does not
store your Google password, access token, refresh token, name or email in that
identity table. A temporary transaction stores hashed state/browser bindings,
nonce and proof material, usable for up to ten minutes. Expired transactions
are cleaned when another sign-in starts.

The optional verified display name and Google profile-picture URL are retained
only inside the signed, secure, HttpOnly website session cookie, for up to 15
minutes, and displayed in your private account menu. They are not saved to the
identity database, local workspace backups or public website assets. The menu
uses a neutral fallback when these claims are absent or unusable. Displaying a
Google-hosted picture makes a browser request to Google, which receives normal
connection information such as your IP address; ROVER sends no page referrer
with that image request. Account pages and menus are not cached by ROVER.

The website session uses a Secure, HttpOnly host cookie and expires after
15 minutes. The database keeps its token hash, account ID and expiry, never the
bearer token. Website Sign out of ROVER revokes that session and clears its
cookies. Expired session records are cleaned when another session is created;
identity records remain until deletion. Ask the maintainer through your private
tester contact to delete a beta account. Account sign-out/deletion does not
delete workspaces stored in your extension. No workspace data is uploaded.

The 0.3.9 candidate enables optional account connection only for the registered
personal Chrome testing installation. Connection uses a random installation ID
separately from workspace data, with one-time state and proof in memory. Tokens
stay only in extension session storage, outside backups; browser restart clears
that storage. Opening Account with a saved session, or choosing Check connection,
sends that session to the protected server to verify its registration and expiry.
No workspace content is sent. Browser sign-out attempts to revoke that exact
session and clears its local record even if confirmation fails. Sessions expire
within 15 minutes and do not yet auto-renew. Website sign-out is separate.

Explicit sign-in sends the installation ID, extension ID, random state and
public proof challenge to the protected beta website. The verifier and one-time
code are sent only in a bounded exchange to that website. The server briefly
retains hashed code and installation identifiers, proof challenge and opaque
source account/session references, never the raw proof verifier or session
token. Codes are usable for up to two minutes; expired handoff rows are cleaned
when another handoff starts. A short-lived HttpOnly connection cookie resumes
explicit approval after Google login. Google sign-in, Drive backup and workspace
sync remain separate choices.

## Data kept on your device

Update notices store pending/installed version information and dismissal state
locally, separately from portable backups. **Check for updates** opens the
protected beta website in a browser tab with the installed release version in
the URL. It does not send workspace URLs, names or contents, and does not poll
in the background. Normal website access/security processing still applies.
Browser-store update delivery is handled by the browser and its store.

When you capture or save a workspace, ROVER Workspaces stores its name and description; supported HTTP/HTTPS tab URLs and titles; window and tab order; pinned and active state; group names, colors, and collapsed state; and workspace identifiers and creation/update times.

Favorites, collection names and assignments, and the last time a workspace was successfully opened are also stored locally. This recent-workspace record is not a record of every website you visit. Appearance preferences, Custom Templates, saved workspace revisions, trial/entitlement status, and explicit local profile/link records are stored separately. Saved revisions follow the configured per-workspace retention (5–50), subject to a 500-revision total limit. Local previews are drawn from saved group names and colors; ROVER Workspaces does not fetch screenshots or remote favicons for them.

These records use extension-local storage in the current browser profile. ROVER Workspaces does not provide its own encryption or a cloud backup. Other users or software with access to your device or profile may be able to access that data. Device backup software may also copy it.

## What the extension does not collect

The optional beta account connection described above does not upload workspaces.
The extension has no analytics, advertising, crash-report upload, cloud
synchronization, or server that receives saved workspaces. It does not read page
content, cookies, passwords, form entries, or the browser's history database.
It excludes private windows and browser-internal, file, and unsupported tab URLs
when capturing.

URLs and titles can still contain personal information, search terms, private document names, or access tokens in query strings. Capture does not remove that information. Review saved data and exports before sharing them.

## Permissions and connections

| Permission   | Current purpose                                                                              |
| ------------ | -------------------------------------------------------------------------------------------- |
| storage      | Save workspaces, organization, recent opens, and appearance preferences locally.             |
| tabs         | Read tab URLs/titles during capture and create, activate, pin, or group tabs during restore. |
| tabGroups    | Read group names/colors/collapsed state and recreate those properties.                       |
| contextMenus | Offer the explicit capture action in the browser extension context menu.                     |
| alarms       | Run opt-in daily local capture; scheduling is off by default.                                |

The identity permission prepares the browser sign-in window without requesting browser-account email access. Optional host access is limited to https://beta.roverworkspaces.com/* and will be requested only after an activated sign-in click. The manifest requests no required host permissions and installs no content scripts. Capture is manually initiated unless you enable scheduled capture. Restoring opens saved websites in new windows or the current window as selected; Reload current window closes current tabs except the extension page before restoring; those sites receive normal browser requests and follow their own privacy practices. Documentation links open the Cloudflare-hosted beta site; source and public support links open GitHub. Their respective policies apply. Browser and store services may have their own update or diagnostic behavior independent of ROVER Workspaces.

## Protected beta website

The beta website uses Cloudflare Access to admit approved tester email addresses.
Cloudflare verifies an email address through a one-time login code and uses
session cookies to remember website access. It processes connection information,
including IP addresses, requested website paths, and authentication/security
events. Bot protection may run Cloudflare detection scripts in the website.
These website controls do not read or upload saved extension workspaces and
are separate from the future ROVER account and sync system.

The maintainer manages the tester allowlist and can remove access on request.
Website and security logs follow the configured Cloudflare service retention;
local workspace deletion does not delete those separate service records.
See [Cloudflare's privacy policy](https://www.cloudflare.com/privacypolicy/).
The site requests no search indexing and does not add marketing analytics.

## Voluntary bug reports

The beta support form asks for a summary, app version, browser/version, optional
screen size, reproduction steps, expected result, and actual result. Submission
requires explicit confirmation that the report is public. Those entered fields
are sent to GitHub and published in the public project issue tracker under
the maintainer's integration identity. The form does not automatically send
saved workspaces, tab URLs, screenshots, or your tester email. Anything you type
into the fields is part of the public report: do not include private information.
The GitHub submission credential stays on the server, outside the extension
and public website assets.

The server verifies Cloudflare Access sign-in and uses the verified tester
identifier for submission rate limiting; it is not added to the GitHub report.
A short-lived, secure support cookie protects form submission. Authenticated
GitHub reads are not cached. Without the integration credential, public GitHub
issue content is cached briefly for the on-site viewer; form bodies and
authentication credentials are not cached or deliberately logged by ROVER.
Website/security request logs remain subject to the Cloudflare handling above.
GitHub retains reports and comments under its own policies, and they may be
copied or indexed outside the beta. Contact the maintainer about corrections
or removal; deleting local extension data does not remove public issues.
See [GitHub's privacy statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).

## Export, retention, and deletion

Exports are unencrypted JSON or YAML files containing workspace data. They do not include favorites, collections, recent-open records, or appearance settings. The separate Full local backup in settings also contains collections, favorites, recent opens, appearance, Custom Templates, and saved revisions. It excludes account sessions, entitlement/license records, provider tokens, encryption keys, and profile/device sync links. It is unencrypted; restoring it replaces the previewed local library and switches scheduled capture off. Neither export type is a credentials or browser-profile backup. Exported files remain wherever your browser saves downloads until you remove them; deleting a workspace does not delete an exported copy.

Saved workspaces remain until you delete them or remove the extension's local data. Removing a collection only removes its organization; it does not delete the workspaces inside it. Uninstalling removes the extension's local data. Export anything you want to retain before uninstalling. Data copied to other devices, backups, exports, or websites must be managed separately.

## Questions and changes

Use the [support guide](SUPPORT.md) to contact the maintainer through the public project issue tracker. Do not post private exports, sensitive URLs, or credentials. Future account, sync, or monetization features would require this document and the corresponding store disclosures to be reviewed before release.
