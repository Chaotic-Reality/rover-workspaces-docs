# ROVER capability status

Updated October 9, 2026. This describes engineering evidence, not a store release.

The current local personal testing version is **0.3.6**, including Update from
current tabs. Installed Chrome/Edge acceptance remains pending. Reload the
existing unpacked installation and check About or extension details for its version.

An earlier application check passed all 222 tests and the build after a
test-runner process workaround. A later check still encountered an intermittent
Windows worker startup failure before a browser test ran; the underlying runner
issue remains unresolved. Tests remain automatically discovered and failures
stop the check. This tooling work enables no additional live capability.

| Area                                                       | Current evidence                                                    | Remaining gate                                                       |
| ---------------------------------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Local workspace capture, edit, restore, collections, theme | Implemented with automated tests                                    | Installed Chrome/Edge upgrade and visual acceptance                  |
| Update saved workspace from current tabs | Replacement preview, revision storage and stale-edit rejection implemented; UI coverage added | Installed Chrome/Edge preview, cancel, update and undo acceptance |
| Custom Templates, organization, history, scheduled capture | Implemented; local entitlement simulation and manual 15-day trial   | Pilot usefulness and installed-browser behavior                      |
| Free and paid plans                                        | Free limit of two workspaces; planned Pro Local and Pro Sync        | Actual purchase/renewal/provider sandbox and legal terms             |
| Google/Microsoft sign-in                                   | Beta host composition, including protected extension approval/exchange, passes isolated runtime tests; empty account database prepared; deployed sign-in and handoff stay disabled | Extension UI and transport acceptance, installed-browser acceptance and live consent |
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
