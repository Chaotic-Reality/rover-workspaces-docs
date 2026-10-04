# ROVER-hosted sync evaluation

ROVER's hosted sync is a later Pro capability. The current product remains local-first, and user-owned Google Drive or OneDrive backups are evaluated before ROVER-hosted sync is enabled.

The recommended shape is a Cloudflare Worker API, D1 for small metadata and manifests, and R2 Standard for encrypted workspace objects. Encryption happens in the extension before upload. Purchaser identity, ROVER profiles, browser mappings, devices, and provider accounts stay separate, and sync requires explicit profile and device consent.

The local Worker/D1 contract has a free staging deployment for development and
contract testing. It is not production sync: there is no hosted account
activation, key recovery, R2 bucket, or paid plan connected. Before launch,
ROVER still needs hosted quotas, retention, deletion tombstones, key recovery,
offline queues, hosted authentication, and live security and browser acceptance.

Staging endpoint: `https://rover-sync-staging.tech-e40.workers.dev`. It accepts
only the local encrypted-manifest and durable-queue contract and is not a public
user service.

See the [Cloudflare Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/), [D1 pricing and limits](https://developers.cloudflare.com/d1/platform/pricing/), and [R2 pricing](https://developers.cloudflare.com/r2/pricing/) for current platform details.
