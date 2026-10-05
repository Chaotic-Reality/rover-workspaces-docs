# ROVER beta setup checklist

This checklist explains the owner-controlled steps needed before hosted sign-in
and cloud backups can be enabled. The beta can be tested locally before these
steps are complete.

## Local extension testing

Build the package from the private application repository with `npm run
package`, then load the extracted ZIP folder through the browser's Extensions
page with Developer mode enabled. Test Chrome and Edge separately, including
restore targets, selective restore, duplicate preview, import/export,
responsive navigation, and data persistence after reload.

## Google

Create a beta Google Cloud project, configure the OAuth consent screen, add the
beta homepage and privacy URL, add tester accounts, enable Google Drive API,
and create an OAuth client. ROVER will use the narrow Drive app-data area for
backup. The final redirect URL must be supplied by the implementation before it
is registered. Do not publish client secrets or refresh tokens.

## Microsoft

Create a Microsoft Entra app registration, select the required personal and
work/school account types, and use authorization code with PKCE. Register the
final callback URL only after the implementation supplies it. Sign-in scopes
come first; the OneDrive application-folder permission is added when backup is
enabled. Do not publish application secrets.

## Admin access

The admin shell must be placed behind a Cloudflare Access self-hosted
application with an owner-only allow policy and MFA before deployment. It is
not part of the public beta site.

## Privacy boundary

ROVER does not sync cookies, passwords, authentication sessions, page contents,
or general browser history. Backup payloads are encrypted before upload, and
browser profiles remain separate until the user explicitly links them.

See [Identity and sign-in](IDENTITY_SIGNIN.md), [Hosted sync](HOSTED_SYNC.md),
and [Hosting](HOSTING.md) for the design details.
