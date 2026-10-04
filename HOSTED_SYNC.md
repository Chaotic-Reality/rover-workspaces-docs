# ROVER-hosted sync evaluation

ROVER's hosted sync is a later Pro capability. The current product remains local-first, and user-owned Google Drive or OneDrive backups are evaluated before ROVER-hosted sync is enabled.

The recommended shape is a Cloudflare Worker API, D1 for small metadata and manifests, and R2 Standard for encrypted workspace objects. Encryption happens in the extension before upload. Purchaser identity, ROVER profiles, browser mappings, devices, and provider accounts stay separate, and sync requires explicit profile and device consent.

This is an evaluation, not a deployment. No account, Worker, database, bucket, or paid plan is connected. Before launch, ROVER still needs quotas, retention, deletion tombstones, key recovery, offline queues, hosted authentication, and live security and browser acceptance.

See the [Cloudflare Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/), [D1 pricing and limits](https://developers.cloudflare.com/d1/platform/pricing/), and [R2 pricing](https://developers.cloudflare.com/r2/pricing/) for current platform details.
