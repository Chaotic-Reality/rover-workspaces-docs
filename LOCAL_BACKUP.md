# Full local backup and recovery

In **Appearance & settings → Full local backup**, choose **Download local
backup**. This is available on Free. Keep the downloaded JSON privately: URLs,
titles, descriptions, collection names, and previous revisions may be sensitive.
The file is unencrypted.

The versioned backup contains workspace content and card order, collections and
assignments, favorites, recently opened timestamps, appearance and other local
preferences, Custom Templates, and saved workspace revisions. It has an 8 MB
limit. Ordinary JSON/YAML workspace exports remain available for moving just
workspace content; those files are not interchangeable with a full backup.

To restore, choose a full backup file in settings. Read its replacement preview,
download the current local data first, then confirm replacement. Restoration
replaces this installation's local library, rather than merging it. It does not
open websites or close browser tabs. If another manager tab changes local data
after the preview, restoration refuses to overwrite it; create a fresh preview.

Account sessions, trials, licenses, provider tokens, encryption keys, named sync
profile/device links, and browser credentials are excluded. Restoring cannot
unlock Pro or reconnect a different account. Scheduled capture is always turned
off on restore; enable it explicitly if wanted. Future cloud profile transfer is
a separate capability, not part of this local recovery file.

Keep the extension in a stable unpacked folder during development updates and
use Reload in Chrome/Edge's extensions page. Moving/removing that loaded folder
can change extension identity and make old profile-local data seem absent. Back
up before uninstalling. Browser cookies, sign-ins, bookmarks, passwords, and
general browser history require the browser's own recovery tools.
