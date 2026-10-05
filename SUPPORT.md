# ROVER Workspaces support

The current support channel is the [public ROVER Workspaces issue tracker](https://github.com/Chaotic-Reality/rover-workspaces-docs/issues), maintained by Chaotic-Reality. The application is in development; no response-time commitment or private support inbox is currently advertised.

## Report a problem

Include the ROVER Workspaces version from About, your browser name/version, what you expected, what happened, and the shortest steps that reproduce it. Mention whether the issue started after an update. Use invented workspace names and public example URLs when sharing reproduction steps.

Do not attach real workspace exports, browsing history, cookies, credentials, access tokens, or private project URLs. Crop or redact screenshots before uploading. Public issues are visible to everyone; GitHub handles the information you submit under its own policies.

If the problem involves private data or a potential security issue, open a minimal report asking the maintainer to arrange an appropriate private exchange. Do not include sensitive details in that public request.

## First checks

1. Download a [Full local backup](LOCAL_BACKUP.md) from settings before troubleshooting saved data. Ordinary JSON/YAML workspace exports contain workspaces, not appearance preferences or collections.
2. Check the version in About and the [release notes](CHANGELOG.md).
3. For an unpacked development extension, reload it on the browser's extensions page and reopen the manager. Do not uninstall as a routine troubleshooting step; that removes local extension data.
4. If capture skips tabs, check whether they are private, browser-internal, file, or unsupported URLs. Supported capture uses normal HTTP/HTTPS tabs.
5. If an import is blocked by a changed destination, cancel and review the file again against the current saved workspaces. See the [import guide](IMPORTING.md).

Chrome and Edge are the initial targets. Live acceptance testing remains a release gate; support for other browsers is not currently promised.
