import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

// Deployed as the user site at the root of justin21523.github.io,
// so there is no base path / asset prefix.
const nextConfig: NextConfig = {
  output: "export",
  experimental: {
    cpus: 1,
  },
  trailingSlash: true,
  basePath: undefined,
  assetPrefix: undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: "",
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "justin21523.github.io",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
