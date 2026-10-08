// The public site origin is shared by generated metadata and live smoke checks.
// Navigation stays relative so the same assets work on previews and the beta.
export const siteUrl = new URL(
  process.env.ROVER_SITE_URL || "https://beta.roverworkspaces.com",
);
if (
  siteUrl.protocol !== "https:" ||
  siteUrl.username ||
  siteUrl.password ||
  siteUrl.pathname !== "/" ||
  siteUrl.search ||
  siteUrl.hash
)
  throw new Error("ROVER_SITE_URL must be an HTTPS origin without a path.");
