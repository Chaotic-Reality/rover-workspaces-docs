# Store listing preparation

Draft for ROVER Workspaces 0.3.5, prepared October 5, 2026. This is preparation material, not an announcement or a submitted listing. Validate the final candidate in installed Chrome and Edge before using this copy. Check each store's current form requirements when submitting.

## Product name and short description

**ROVER Workspaces**

Save, organize, and restore browser workspaces with grouped tabs. Stored locally on your device.

## Full description draft

Keep the tabs for a project together and return to them when you need them.

ROVER Workspaces saves browser windows, tabs, and tab groups as reusable workspaces. Capture your current window or all normal windows, organize the result, and reopen it in new windows while keeping your existing tabs open.

- Organize tabs beneath their groups. Drag groups and tabs to reorder them, or use keyboard movement controls.
- Preserve pinned tabs, active-tab selection, group names, colors, and collapsed preferences where the browser supports them.
- Combine workspaces, merge into an existing workspace, or add a starter template to one you already use.
- Import and export JSON or YAML with groups and tabs arranged together. Review imports as new copies, replacements, or merges.
- Find workspaces with search, Favorites, Recently opened, and collections.
- Choose Clean or Modern styling, light/dark/system appearance, accent colors, and comfortable or compact spacing.
- Start with templates for AI Tools, Search Engines, Developer Tools, Cloud Platforms, and Productivity.

Workspace data stays in extension-local storage in your browser profile. The current version has no ROVER Workspaces account, telemetry, or cloud upload. Exported files contain saved URLs and titles, so review them before sharing. Restoring a workspace opens its websites, which follow their own privacy practices.

ROVER Workspaces captures supported HTTP/HTTPS tabs in normal windows. It does not copy sign-ins, cookies, form contents, private browsing sessions, or native Edge Workspaces. Browser-internal and file tabs are excluded. It does not provide cross-device sync. Export a backup before uninstalling, which removes local extension data.

## Single purpose

Save, organize, and restore user-selected browser workspaces consisting of windows, tabs, and tab groups.

## Permission explanations

| Permission | Explanation for review                                                                                                                                     |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| storage    | Retain saved workspaces, favorites, collections, recent-workspace timestamps, and appearance preferences in the current profile's local extension storage. |
| tabs       | Access URLs and titles when the user captures a workspace, and create or adjust tabs when the user restores one. Capture is user initiated.                |
| tabGroups  | Read tab-group names, colors, and collapsed state during capture and restore those properties when reopening saved groups.                                 |
| contextMenus | Add user-invoked commands to save the current tab or tab group as a local workspace.                                                                       |

The current manifest has no host permissions, content scripts, or remote-code loader. All executable extension code is bundled. Opening a saved website is a normal browser navigation, not a background upload of the workspace to a ROVER Workspaces server.

These explanations are source-checked drafting inputs, not completed store data-use declarations. ROVER Workspaces **does access and store URLs and titles locally**. Do not describe it as accessing no user data merely because it has no backend. Review the actual data categories and wording in each store's form against [Privacy and data handling](PRIVACY.md) before submission.

## Reviewer test steps

No ROVER Workspaces sign-in or test credentials are needed. Use public sample sites; third-party sites may have their own accounts, which are not needed to test workspace organization.

1. Open two public HTTP/HTTPS pages, put them in a named browser tab group, and pin another tab.
2. Open ROVER Workspaces from its toolbar action. Capture the current window with a recognizable test name.
3. Edit the workspace. Reorder groups/tabs, add a group, move a tab, and save. Reload the manager and confirm the changes persisted.
4. Open the saved workspace. Confirm it opens new windows while leaving the original tabs open. Compare the tab ordering, pinned state, and group properties.
5. Export the workspace as JSON and then YAML. Import each as a copy and compare its contents. Import again using an explicit merge destination and check the before/after counts.
6. Add a starter template to an existing workspace. Review and save. Confirm the existing tabs remain.
7. Mark a workspace as a favorite, assign a collection, and change appearance. Reload the manager and confirm those choices persist.

Record these results separately for Chrome and Edge. These are instructions for testing; no completed reviewer or browser-acceptance result is asserted here.

## Links for the listing

- [Product documentation](https://github.com/Chaotic-Reality/rover-workspaces-docs)
- [Privacy and data handling](https://github.com/Chaotic-Reality/rover-workspaces-docs/blob/main/PRIVACY.md)
- [Support guide](https://github.com/Chaotic-Reality/rover-workspaces-docs/blob/main/SUPPORT.md)
- [Public issue tracker](https://github.com/Chaotic-Reality/rover-workspaces-docs/issues)

## Remaining listing assets and decisions

- Capture screenshots from the installed extension using invented workspace names and public sample URLs: workspace library, group editor, import/merge preview, and appearance settings.
- Confirm toolbar/icon appearance on light and dark Chrome and Edge themes, including display scaling.
- Verify the current store's required image sizes and formats before producing upload assets. Sample-data browser previews are not final store screenshots.
- Confirm the intended publisher accounts, listing visibility/markets, and support route before submission.
- Decide monetization after core validation. This draft makes no pricing, subscription, or paid-feature promises.
- Recheck the final version, permissions, data handling, dependency audit, and package verification record. Obtain the owner's release decision before submitting.
