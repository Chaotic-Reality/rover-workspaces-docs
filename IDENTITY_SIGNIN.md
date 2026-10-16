# ROVER account sign-in

ROVER Workspaces will support **Google sign-in** and **Microsoft sign-in** for
the ROVER account. These identity providers authenticate the person; they are
separate from Google Drive and OneDrive backup connections, payment, and
Cloudflare hosting.

## Account model

The account is the owner of Pro status, ROVER profiles, linked devices, and
synced workspaces. The provider issuer and subject are stored as an opaque
identity binding. Email addresses and browser-profile names are not used to
merge accounts automatically.

Users may link a second sign-in method only after signing in to the existing
ROVER account. This allows a person to use Google on one device and Microsoft
on another without creating accidental duplicate accounts.

## Browser-profile behavior

Each Chrome or Edge profile signs in to ROVER explicitly. After sign-in, the
user chooses which ROVER profile to link to that browser profile. A single
ROVER account can therefore share a workspace across Chrome, Edge, and several
Chrome profiles while keeping Personal, Work, Scouts, and other profiles
separate.

## Planned flow

1. The extension opens the ROVER sign-in page.
2. The user chooses Google or Microsoft.
3. The identity provider returns an authorization-code result using PKCE and
   state validation.
4. The Worker verifies the provider assertion and resolves the ROVER account.
5. The Worker issues a short-lived ROVER session and the extension links the
   selected browser profile to a ROVER profile.
6. Sync requests require the session, profile consent, device identity, and a
   current Pro entitlement.

No provider credentials or client secrets belong in the extension bundle. The
provider registrations, callback URLs, and Worker secrets will be configured
before hosted sign-in is enabled.

## Website Google acceptance test

The protected beta Account page offers **Continue with Google** to approved
website testers. This is the first live acceptance stage, not a verified account
sync service. Complete Google consent to return to the Account page, where
**Signed in to ROVER** and **Sign out of ROVER** should appear. Sign out, reload,
and verify the sign-in control returns. The website session lasts 15 minutes.
The shared top-right Account menu shows sign-in or sign-out controls on every
page, with the verified Google name and picture when available. Click outside
or press Escape to close it. License details are not yet connected.
Microsoft remains unavailable. The 0.3.9 candidate enables extension sign-in
only for the registered personal testing installation, through explicit
connection approval; its installed-browser transport remains to verify.
Drive backup and workspace sync are separate future steps. See the privacy
policy for account records and cookies used by this optional test.

## Current implementation and acceptance

The website Google flow is owner-verified. The 0.3.9 candidate enables extension
connection for the explicitly registered personal Chrome testing installation.
The user clicks Sign in with Google, permits access to the beta origin, completes
the protected website flow and explicitly approves Connect this browser.
The browser validates the exact callback and exchanges its one-time code using
an installation-held proof, with redirects and retries disabled.

The server verifies signed tester access, exact extension origin and registration,
short-lived source-session validity, one-time consumption and proof possession.
A revoked source session cannot authorize redemption. The extension session
cannot outlast its source session and currently expires within 15 minutes.
Tokens remain in extension session storage outside backups and exports.

Check connection verifies registration and expiry with the server. Offline,
Access or rate-limit failures show an unverified state rather than claiming a
valid session. Browser sign-out revokes only that session and clears locally
even when the server cannot be reached. Website sign-out is separate.

Automated tests cover provider signature/audience/nonce checks, atomic code
redemption, real isolated database operations, trusted-origin CORS, expiry,
revocation, blocked responses and cancellation. Installed Chrome/Edge transport,
website-cookie availability and the exact testing package still require owner
acceptance. No Access bypass is introduced for extension requests.

Microsoft registration, account linking, renewable browser sessions and hosted
Pro grants remain future work. Testers will receive complimentary Pro through
the account grant path when implemented. Test Free Mode will apply Free limits
without removing their actual grant or saved workspaces. Signing in currently
does not grant Pro, connect Drive/OneDrive or upload workspaces.
## Manual setup checklist

When hosted sign-in is ready to configure:

- Create a Google Cloud project, enable the required identity APIs, configure
  the OAuth consent screen, and create a client ID.
- Create a Microsoft Entra app registration and select the supported account
  types for consumer and work/school sign-in.
- Register the staging and production callback URLs exactly as configured by
  the Worker and extension identity flow.
- Record the client IDs in staging configuration; keep client secrets and
  signing keys in Wrangler secrets.
- Test account creation, Google/Microsoft account linking, sign-out, revoked
  sessions, and a second Chrome profile before enabling hosted activation.

## Setup references

- [Chrome `browser.identity` API](https://developer.chrome.com/docs/extensions/reference/api/identity)
- [Google OAuth 2.0 for installed applications](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Microsoft authorization-code flow with PKCE](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow)
