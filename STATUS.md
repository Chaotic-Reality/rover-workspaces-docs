# ROVER capability status

Updated October 7, 2026. This describes engineering evidence, not a store release.

| Area                                                       | Current evidence                                                    | Remaining gate                                                       |
| ---------------------------------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Local workspace capture, edit, restore, collections, theme | Implemented with automated tests                                    | Installed Chrome/Edge upgrade and visual acceptance                  |
| Custom Templates, organization, history, scheduled capture | Implemented; local entitlement simulation and manual 15-day trial   | Pilot usefulness and installed-browser behavior                      |
| Free and paid plans                                        | Free limit of two workspaces; planned Pro Local and Pro Sync        | Actual purchase/renewal/provider sandbox and legal terms             |
| Google/Microsoft sign-in                                   | OIDC, PKCE, session, and activation contracts tested locally        | Client registrations, callback wiring, verified live account sign-in |
| Google Drive/OneDrive backups                              | Narrow-scope adapter and encrypted transfer contracts tested        | OAuth consent, token handling, live rate-limit/revocation testing    |
| ROVER-hosted sync                                          | Free staging Worker/D1 deployed; entitlement/consent enforced        | Live identity, key recovery, profile sync and conflict acceptance    |
| Cross-browser portability                                  | Named profiles, mappings, consent, transfer plans implemented       | Hosted UI retrieval and live Chrome↔Edge/profile round trip          |
| Website                                                    | Free static-assets beta; canonical Markdown guides and shared brand | Owner content review and installed-build screenshots                 |
| Administration                                             | Local shell only                                                    | Hostname, Cloudflare Access protection, authorized deployment        |

The October 5 cleanup adds Full local backup and a replacement preview, sidebar
startup regression coverage, and real Worker/D1 runtime tests. Staging now checks
active Pro Sync entitlement and exact profile/device consent, rejects malformed
and oversized bodies, and protects manifest/ledger writes from concurrent loss.
The additive consent migration is deployed and starts empty. It does not turn
the fixed staging credential into multi-user sign-in.

No live account sync, billing, Google Drive, or OneDrive connection is enabled
for testers. A healthy staging endpoint does not prove an authenticated sync
round trip. Configured public beta website: https://beta.roverworkspaces.com/.
The custom domain is attached to the existing beta Worker; live DNS/TLS and page
checks are recorded separately from local build verification.

The release path is personal debugging → privately shared reviewed package →
invited store beta → public release. Keep a stable unpacked folder for local
upgrades. The app version is the release version; each package has a separate
build ID, source commit, timestamp, and checksum. Do not use folder moves as
an upgrade method for an installed unpacked extension.

Manual dependencies are tracked privately in `docs/NEXT_STEPS_ON_ME.md`:
browser acceptance, Google and Microsoft registrations, final callback domain,
admin Access policy, and billing approval. These do not block local engineering.
