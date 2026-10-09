# ROVER Workspaces user guide

ROVER means **R**estore, **O**rganize, **V**iew, **E**xplore, **R**epeat.
Save browser windows, tabs, and groups so you can return to them later.
The development build supports Chrome and Edge and keeps data in the current
browser profile. Check [feature status](STATUS.md) for what is ready and what
still needs setup; live cloud connections are not enabled.

## Install and update the beta

Use the [beta installation page](https://beta.roverworkspaces.com/beta-install.html) for the complete procedure.
Extract the reviewed extension ZIP into a stable folder, open
`chrome://extensions/` or `edge://extensions/`, enable Developer mode, and choose
**Load unpacked**. Select the extracted folder containing `manifest.json`.

Before updates, download a Full local backup. Replace the files in that same
loaded folder and use the browser's extension **Reload** button. Moving or
uninstalling an unpacked extension can change its identity or remove local data.
Different browser profiles have separate local libraries.

## Save a workspace

1. Open the HTTP/HTTPS pages you want to keep. Arrange browser tab groups and
   pinned tabs as needed.
2. Open ROVER from its toolbar action and choose **Capture workspace**.
3. Choose the capture scope, name the workspace, review its tabs, and save.

### Update an existing workspace from current tabs

Arrange tabs and groups in the browser, then choose the workspace card's
**More actions → Update from current tabs**. Review the saved/replacement
counts and expand **Review captured tabs and groups** to inspect the captured
URLs. Choose **Replace saved tabs** to replace all saved windows with the
current window's supported tabs, or **Cancel** to keep the existing workspace.

The preview is a snapshot: cancel and reopen it after further browser changes.
ROVER keeps the workspace name, description, collection, favorite and card
position. It leaves open tabs alone and excludes private, internal and extension
pages. An empty capture or a concurrent edit cannot overwrite your workspace.
**Undo update** reverses the replacement while the saved result remains
unchanged. The standard local revision is also retained; History access follows
your plan. This action updates an existing workspace and does not use another
workspace slot.

Private windows, browser-internal pages, and unsupported URLs are excluded.
ROVER does not copy a website's cookies, passwords, forms, or sign-in session.

## Arrange your library

Use the favorite star, search, and collections to find a workspace. Click a
selected collection again to clear that filter. Collections are alphabetized;
**No collection** is the default choice in the card's collection selector.

Drag workspace cards to rearrange them; dashed insertion guides show the
landing position. Use **Edit** to change the name, description, windows, groups,
and tabs. Drag handles or keyboard movement controls arrange groups and tabs.
Save changes before closing the editor. History and less common commands are
available through the editor or the card's **More actions** menu.

## Open all or part of a workspace

**Open workspace** uses your saved default destination. **Open options** lets
you choose the current window or new windows. Ordinary opening keeps your
existing tabs available.

Use **Restore options → Choose tabs and groups** for a selection preview.
Select all or unselect all, choose the tabs you need, review duplicates, and
choose the current or a new window as the destination.

**Reload current window** replaces the current window's tabs with the saved
workspace while preserving the extension page. Save or capture any work you
need first. Use public sample tabs when testing this action.

## Templates, organization, and the trial

Starter templates provide common groups of links. Custom Templates let you
reuse your own workspace shape with project placeholders. Workspace combining,
organization rules, Custom Templates, extended history, and scheduled capture
are local Pro capabilities. See [plans and trial details](PRICING.md).

Free includes two workspaces. The local 15-day Pro trial starts only when you
choose to start it; it does not begin a paid subscription. Existing data remains
viewable and exportable when the trial ends. Cloud features are planned and
cannot be activated merely by starting this local trial.

## Back up or move your data

Use JSON/YAML workspace exports when sharing or moving selected workspaces.
They contain saved URLs and titles; review them before sharing. The
[import guide](IMPORTING.md) explains copy, replace, and merge previews.

For recovery, use **Appearance & settings → Full local backup**. It includes
workspace ordering, collections, favorites, recent opens, appearance, Custom
Templates, and saved revisions. Review the replacement preview before restoring
it. Account sessions, licenses, provider credentials, encryption keys, and sync
profile links are excluded. Scheduled capture stays off after restoration.
Read [Full local backup](LOCAL_BACKUP.md) for limits and safe recovery testing.

## Appearance and scheduling

Appearance settings offer Clean/Modern styling, light/dark/system mode, accents,
and spacing. They do not automatically copy a browser profile's accent color.
Optional daily capture is off by default and operates locally only when enabled.
See [appearance](APPEARANCE.md) and [privacy](PRIVACY.md) for details.

## Get help

Record the extension version and build, browser/version, viewport, steps,
expected result, and actual result. Redact screenshots and use invented names
and public URLs. Do not post credentials or private workspace exports.
The [support guide](SUPPORT.md) explains the current reporting channel.
In the updated build, **About ROVER Workspaces → Report a bug** opens a ROVER
form, and **Issue updates** lets you read issue status and comments without
leaving the site. Approved tester website sign-in is required. Reports are
public on GitHub. The server handles submission credentials; you do not need
a GitHub account to report a bug or read updates here.

Follow the [roadmap](ROADMAP.md) for future work and [change history](CHANGELOG.md)
for completed development milestones. This guide is maintained in the public
repository and published on the branded website; it replaces the older wiki
guide as the canonical user documentation.
