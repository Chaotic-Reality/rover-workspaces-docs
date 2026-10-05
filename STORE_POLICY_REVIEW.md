# Chrome and Edge store policy review

Reviewed October 5, 2026 against the current official policy pages. This is a planning record, not a store submission approval. Repeat the review immediately before enabling paid features, cloud upload, sponsorship, or submitting a release candidate.

## Chrome Web Store

- [Developer Program Policies](https://developer.chrome.com/docs/webstore/program-policies)
- [Policy details](https://developer.chrome.com/docs/webstore/program-policies/policies)
- [User data and Limited Use](https://developer.chrome.com/docs/webstore/user_data)
- [Data handling requirements](https://developer.chrome.com/docs/webstore/program-policies/data-handling)

ROVER must keep its single purpose clear, request only permissions needed by the current release, maintain an accurate privacy policy, disclose data practices before installation and when they change, and handle transmitted data with modern cryptography. Google API data needs a Limited Use disclosure on the product website. Payment handling must use secure collection and transmission practices; checkout and licensing stay outside the extension bundle.

## Microsoft Edge Add-ons

- [Developer policies](https://learn.microsoft.com/en-us/legal/microsoft-edge/extensions/developer-policies)
- [App Developer Agreement addendum](https://learn.microsoft.com/en-us/legal/microsoft-edge/extensions/ada-addendum)

ROVER must keep the privacy policy current as features change, obtain opt-in consent before sharing user data with third parties, and describe paid features and price ranges clearly. Microsoft requires a secure third-party purchase API for paid services. The listing and in-product copy must make the seller, terms, and support path clear.

## ROVER decisions

1. Do not add personalized advertising or sponsorship to the extension while local data is the product's privacy promise.
2. Keep Google Drive and OneDrive disabled until registrations, consent copy, minimum scopes, encryption, and revocation tests are complete.
3. Keep payment secrets, provider tokens, and authoritative entitlement decisions on the server.
4. Link the public privacy policy from both store listings and the beta product site.
5. Recheck these policies before every store submission and before changing data collection or paid-feature behavior.
