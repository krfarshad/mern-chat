/** @type {import('next').NextConfig} */
import withBundleAnalyzer from "@next/bundle-analyzer";
const assetHosts =
  (
    process.env.NEXT_PUBLIC_BASE_API_ASSET_HOSTNAME ??
    "localhost,avatars.githubusercontent.com"
  ).split(",") ?? "localhost";
const remotePatterns = assetHosts?.map((assetHost) => {
  return { hostname: assetHost };
});

const withCheckBundle = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: true,
});

const nextConfig = withCheckBundle({
  images: {
    remotePatterns: remotePatterns,
  },
});

export default nextConfig;
