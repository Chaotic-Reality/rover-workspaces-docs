# ROVER capability status

Updated October 16, 2026. This describes engineering evidence, not a store release.

Current scope is Google sign-in, Google Drive and Chrome distribution first,
with Cloudflare retained as the backend. Microsoft/OneDrive are deferred. See
the complete [Google beta readiness checklist](GOOGLE_BETA_READINESS.md) for
account, owner provisioning, licensing, payments, backup, sync and release gates.

October 16 preparation: complimentary Pro grant persistence now passes isolated
database/runtime tests for expiry, revocation, audit, concurrent requests and
rollback. The live account database is unchanged. Owner-management protection,
account license reads, app integration and Test Free Mode remain unfinished.

License-source combination is also prepared in isolation: independent paid and
complimentary access can fall back safely when one source ends. This is not yet
connected to live accounts or the app; no tester license or cloud access changed.

The owner confirmed successful website Google sign-in and sign-out on October
15. The first landing after sign-in still displayed signed-out controls until
Account was opened again. The session-cookie correction and shared top-right
account menu are deployed on the existing protected beta after isolated runtime
checks. The owner has since confirmed website sign-in behaves correctly.
Extension connection is prepared in 0.3.9 for the registered personal testing
installation; installed-browser approval/exchange and sign-out acceptance remain.
Microsoft, account-based Pro grants, Drive backup and sync remain unavailable.

Google beta callback registration was confirmed by the owner. Google client
configuration and the encrypted session secret are prepared on the existing
beta Worker. Native Account-page sign-in/sign-out forms pass isolated runtime
checks, including signed tester access, CSRF and session cookies. Extension
handoff is enabled for the registered personal 0.3.9 testing installation;
installed extension connection remains to test. No Drive connection is enabled.
The owner-supplied Chrome testing extension ID is registered for this handoff;
other browser installations are not implicitly approved.
Browser-side proof/state lifecycle tests cover exact callback targets, one-time
use, expiry and cancellation. Browser launch/exchange and explicit website
approval pass isolated runtime tests. Those tests do not prove installed
Chrome/Edge Access-cookie transport; website Google consent is owner-verified.

The current local personal testing candidate is **0.3.10**, including the registered-installation Account connection, Update from
current tabs and simplified update controls inside About. Installed Chrome/Edge acceptance remains pending. Reload the
existing unpacked installation and check About or extension details for its version.

The latest application check passed all 254 tests across 57 discovered files
and the production build after switching Windows simulated-page tests to
isolated thread workers. Earlier runs encountered intermittent fork-worker
startup failures before page tests executed; a fresh-process-only workaround
was insufficient. No tests were skipped or retried and timeouts were unchanged.
The underlying variable startup delay is not fully explained; retain fresh-host
reliability checks. This tooling work enables no additional live capability and
does not replace installed-browser acceptance or create a new extension release.

| Area                                                       | Current evidence                                                    | Remaining gate                                                       |
| ---------------------------------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Local workspace capture, edit, restore, collections, theme | Implemented with automated tests                                    | Installed Chrome/Edge upgrade and visual acceptance                  |
| Update saved workspace from current tabs | Replacement preview, revision storage and stale-edit rejection implemented; UI coverage added | Installed Chrome/Edge preview, cancel, update and undo acceptance |
| Custom Templates, organization, history, scheduled capture | Implemented; local entitlement simulation and manual 15-day trial   | Pilot usefulness and installed-browser behavior                      |
| Free and paid plans                                        | Free limit of two workspaces; planned Pro Local and Pro Sync        | Actual purchase/renewal/provider sandbox and legal terms             |
| Google/Microsoft sign-in                                   | Owner verified website Google consent and sign-out; 0.3.9 registered-installation handoff and session check pass isolated runtime tests | Installed extension approval/exchange and sign-out, Microsoft setup and session renewal |
| Google Drive/OneDrive backups                              | Narrow-scope adapter and encrypted transfer contracts tested        | OAuth consent, token handling, live rate-limit/revocation testing    |
| ROVER-hosted sync                                          | Free staging Worker/D1 deployed; entitlement/consent enforced        | Live identity, key recovery, profile sync and conflict acceptance    |
| Cross-browser portability                                  | Named profiles, mappings, consent, transfer plans implemented       | Hosted UI retrieval and live Chrome↔Edge/profile round trip          |
| Website                                                    | Free static-assets beta; canonical Markdown guides and shared brand | Owner content review and installed-build screenshots                 |
| Administration                                             | Local shell only                                                    | Hostname, Cloudflare Access protection, authorized deployment        |
| Bug reports and issue updates                              | Live form submission, closed status and comments verified; restricted credential | Tester feedback and integration lifecycle before public rollout |

The October 5 cleanup adds Full local backup and a replacement preview, sidebar
startup regression coverage, and real Worker/D1 runtime tests. Staging now checks
active Pro Sync entitlement and exact profile/device consent, rejects malformed
and oversized bodies, and protects manifest/ledger writes from concurrent loss.
The additive consent migration is deployed and starts empty. It does not turn
the fixed staging credential into multi-user sign-in.

No live account sync, billing, Google Drive, or OneDrive connection is enabled
for testers. A healthy staging endpoint does not prove an authenticated sync
round trip. Configured public beta website: https://beta.roverworkspaces.com/.
The custom domain is active on the existing beta Worker. Live DNS/TLS and page
checks are recorded separately from local build verification; cached DNS results
may take time to refresh after a domain change.

The beta website requires Cloudflare Access sign-in for approved tester emails.
This website gate is separate from the planned ROVER account system. Beta
deployment uses a private security handler with the public static assets;
HTTPS/TLS, bot-script security nonces, noindex, and alternate-address checks
are part of deployment acceptance. An approved owner session submitted and read
[acceptance issue #1](https://beta.roverworkspaces.com/issues.html?issue=1) on
October 8, including its closed status and maintainer comment. The admin shell
remains undeployed.

The release path is personal debugging → privately shared reviewed package →
invited store beta → public release. Keep a stable unpacked folder for local
upgrades. The app version is the release version; each package has a separate
build ID, source commit, timestamp, and checksum. Do not use folder moves as
an upgrade method for an installed unpacked extension.

Manual dependencies are tracked privately in `docs/NEXT_STEPS_ON_ME.md`:
browser acceptance, Google and Microsoft registrations, final callback domain,
admin Access policy, and billing approval. These do not block local engineering.
