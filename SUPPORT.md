# ROVER Workspaces support

Use the branded [Report a bug page](https://beta.roverworkspaces.com/report-bug)
and [Issue updates](https://beta.roverworkspaces.com/issues) on the beta website.
Approved tester sign-in is required. The underlying support channel is the
[public ROVER Workspaces issue tracker](https://github.com/Chaotic-Reality/rover-workspaces-docs/issues),
maintained by Chaotic-Reality. The application is in development; no
response-time commitment or private support inbox is currently advertised.

The issue viewer reads public issues without a GitHub account. The server has a
credential restricted to issue management in this documentation repository;
testers do not need to create their own token. Live submission acceptance is
recorded in [feature status](STATUS.md).

## Report a problem

Include the ROVER Workspaces version from About, your browser name/version, what you expected, what happened, and the shortest steps that reproduce it. Mention whether the issue started after an update. Use invented workspace names and public example URLs when sharing reproduction steps.

In the updated extension, choose **About ROVER Workspaces → Report a bug**.
You can also open Support on the website. Fill in the summary, version, browser,
steps, expected result, and actual result; screen size is optional. Confirm that
the details may be published publicly, then submit. The form does not attach
files or automatically collect diagnostics, saved tabs, or your email address.
Reports are posted under the maintainer's GitHub integration identity.

After a successful submission, ROVER opens the issue's update page. Bookmark it
to check its open/closed state and comments. If submission cannot be confirmed,
check the issue list before retrying; GitHub may already have received it.
Validation and upstream errors keep the entered details on the form. Allow
one minute between reports. This is an abuse safeguard, not guaranteed duplicate
elimination across all requests.

Issue updates offer Open, Closed, and All filters plus page navigation. They
exclude pull requests and display plain-text descriptions and comments.
Reload the page for updates. If the server integration is disconnected, public
reads use a five-minute cache; GitHub outages and API limits can temporarily
interrupt the viewer. Email notifications require subscribing
to the original issue on GitHub. Replies from the ROVER site are not enabled.

Do not attach real workspace exports, browsing history, cookies, credentials, access tokens, or private project URLs. Crop or redact screenshots before uploading. Public issues are visible to everyone; GitHub handles the information you submit under its own policies.

If the problem involves private data or a potential security issue, open a minimal report asking the maintainer to arrange an appropriate private exchange. Do not include sensitive details in that public request.

## First checks

1. Download a [Full local backup](LOCAL_BACKUP.md) from settings before troubleshooting saved data. Ordinary JSON/YAML workspace exports contain workspaces, not appearance preferences or collections.
2. Check the version in About and the [release notes](CHANGELOG.md).
3. For an unpacked development extension, reload it on the browser's extensions page and reopen the manager. Do not uninstall as a routine troubleshooting step; that removes local extension data.
4. If capture skips tabs, check whether they are private, browser-internal, file, or unsupported URLs. Supported capture uses normal HTTP/HTTPS tabs.
5. If an import is blocked by a changed destination, cancel and review the file again against the current saved workspaces. See the [import guide](IMPORTING.md).

Chrome and Edge are the initial targets. Live acceptance testing remains a release gate; support for other browsers is not currently promised.
