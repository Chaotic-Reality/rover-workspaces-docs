# From a change to a release

Use [Full local backup](LOCAL_BACKUP.md) from settings before development
upgrades to retain collections, favorites, appearance, templates, and revisions.
Ordinary workspace exports retain only workspace content. Keep a stable loaded
unpacked folder and use Reload; moving the folder or uninstalling may change
extension identity or remove profile-local data. Match every browser acceptance
run to the package build record and checksum.

ROVER Workspaces currently automates verification and packaging. Browser-store publication is not connected to the pipeline. A successful build is a development candidate until Chrome and Edge acceptance is complete.

## Beta release track

The first external release should be a closed beta. Use a numeric release version
such as `0.4.0` and identify the build as `ROVER Workspaces BETA` in the store
name and description. Chrome can restrict a private testing listing to trusted
testers or a Google Group; Edge can use a hidden listing distributed by its
direct URL. Both stores still require review and accurate privacy disclosures.

For personal testing before store submission, run `npm run package` in the
private application repository and share only
`release/rover-workspaces.zip`. Testers extract it and use **Load unpacked** in
`chrome://extensions` or `edge://extensions`. This is suitable for local
features; updates require replacing the extracted folder and reloading.

Keep the Cloudflare environments separate throughout the beta path:

```text
rover-sync-staging   development checks only
rover-sync-beta      invited beta accounts and data
rover-sync-production public release, later
```

Each environment needs its own database bindings, secrets, OAuth callback
configuration, and account data. Do not give beta testers the fixed staging
token or a shared staging account. Register Google and Microsoft callbacks
against the beta store identities because unpacked extension IDs can differ
from Chrome Web Store and Edge Add-ons IDs.

The beta exit criteria are: no known data-loss issue in restore or upgrade,
responsive layouts pass at the supported viewports, the exact packaged build
passes Chrome and Edge acceptance, feedback and recovery instructions are
ready, and the beta Cloudflare environment is isolated from development.

## The delivery path

1. **Edit locally:** make a focused change and add meaningful regression coverage.
2. **Check locally:** formatting, lint, unit tests, TypeScript, production build, and package validation must pass.
3. **Commit:** record a checkpoint. **Push:** back up that checkpoint to the private application repository.
4. **Continuous integration (CI):** GitHub Actions installs the locked dependencies on a clean runner, repeats the checks, packages the extension, and retains the ZIP artifact for 14 days.
5. **Acceptance:** install the exact candidate in disposable Chrome and Edge profiles. Test capture, editing, restore, import/export, upgrades, and the changed features. Record browser versions and results.
6. **Release candidate:** associate the source commit, version, passing CI run, ZIP, checksum, and acceptance record. Keep the archive in private release storage before the CI artifact expires.
7. **Store review and publication:** submit the approved package to each store, track its review, then verify installation and upgrades from the published listing.

This is continuous integration with packaged delivery candidates. It is not automatic deployment to customers. Public documentation can be updated independently of the private source.

## Verifying a packaged candidate

Each package now comes with a separate build record containing the version, checkout reference, whether that checkout had uncommitted changes, the dependency-lock checksum, and checksums for the ZIP and its individual files. The private CI artifact includes both files. Keep the record with the ZIP, and use the verification command described in the private development guide to detect mismatches after copying or downloading it.

The record is unsigned and does not prove who produced a package. It describes the checkout at packaging time; the successful CI run is the build evidence. Browser acceptance and store submission are explicitly unrecorded until tested or performed separately. A matching checksum does not make a build ready for store submission.

## Versions and upgrade safety

Use two identifiers with different jobs:

- **Release version:** the semantic version in `package.json` and `manifest.json`. This is the user-facing/store-facing version. Use patch versions for fixes and small compatible additions, minor versions for substantial feature milestones, and reserve `1.0.0` for the first accepted stable release.
- **Build ID:** the internal identifier in `release/rover-workspaces-build.json`. CI builds use the GitHub Actions run number (`ci-123`); local packages use the source commit (`local-a1b2c3d`). It identifies the exact artifact without changing the store release version.

Keep the application package, lockfile, manifest, and release notes aligned. Export format and local storage schema versions are separate from both the release version and build ID. A store submission increments the release version; a rebuild of the same source release creates a new build ID and must retain its own checksum record.

Test upgrades with existing local workspaces, favorites, collections, and preferences. Exported workspace backups do not include favorites, collections, or appearance preferences. Do not uninstall the user's extension as an upgrade step: local extension data may be removed. Keep the extension identity unchanged.

## Chrome submission

Use the developer account that will own ROVER Workspaces. Prepare the ZIP and listing, complete purpose, permission and data-use disclosures, provide test instructions, then submit for review. Chrome offers deferred publishing so review completion need not immediately publish the item. Follow the current [Chrome publishing guide](https://developer.chrome.com/docs/webstore/publish).

## Edge submission

Use the intended publisher's Partner Center account. Create the extension listing, upload the ZIP, complete availability, properties, privacy, listing assets, and certification notes, then submit. Follow the current [Edge publishing guide](https://learn.microsoft.com/en-us/microsoft-edge/extensions/publish/publish-extension). Update the existing listing for subsequent builds rather than creating a new extension identity; see [Edge update instructions](https://learn.microsoft.com/en-us/microsoft-edge/extensions/update/update-extension).

## Recovery and rollback

For a failed local change, preserve uncommitted work and revert the relevant commit with a new commit. Do not rewrite shared history. Build and test the recovered candidate before distributing it.

For a faulty published build, pause further publication, preserve reproduction details, and prepare a corrective release. Our default recovery procedure is to restore the known-good behavior in a new, higher application version and submit that tested package. Do not assume that uploading an older version will downgrade users. Store review and browser update timing mean recovery is not instantaneous.

Check data compatibility before restoring older code. A previous build might not understand data written by a newer schema. Restore from a user-exported backup only after reviewing what it contains; an application rollback is not a data rollback.

## Remaining release gates

- Installed Chrome and Edge acceptance, including upgrade and conflict scenarios.
- Verify product icons in both installed browsers and capture listing screenshots from the actual extension, replacing sample UI previews.
- Accurate privacy disclosures, support details, and dependency/license review.
- Publisher accounts, listing ownership, and owner decision to submit.
- Monetization design, separately from the current local feature set.

Process documented September 2026. Store dashboards and requirements can change; consult the linked official instructions at submission time.
