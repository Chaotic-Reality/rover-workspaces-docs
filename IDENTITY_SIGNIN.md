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

## Current preparation

The server adapters now exchange Google and Microsoft authorization codes and
verify real signed identity tokens. Tests cover the intended application,
issuer, expiry, nonce, and Microsoft tenant restrictions. Browser-bound sign-in
transactions expire after ten minutes and can be redeemed only once, including
when callbacks arrive at the same time. Account creation uses provider, issuer,
and subject rather than merging matching email addresses.

This preparation is verified locally and in isolated server/database tests.
Revocable session storage also passes isolated tests: signing out invalidates
that session without ending other sessions or affecting another account.
Hosted callback routes, secure browser cookies, sign-out integration, and the
extension handoff remain to complete before configuring credentials and testing
live consent. Google Drive and OneDrive permissions will be separate opt-in
connections. Account sign-in and account sync are not enabled for testers yet.

The HTTP adapter also passes isolated tests for protected cookies, explicit
same-origin actions, one-time callbacks tied to the approved tester, and sign-out.
The beta host now includes the routes behind a disabled feature flag. The
[account page](/account.html) explains the distinction between tester access
and ROVER account sign-in; provider buttons remain disabled. Account database
configuration, enabled-host tests, extension handoff, and live consent remain
before activation. Visiting the page does not connect an account or upload data.

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
