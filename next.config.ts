import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const isGithubPages =
  process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGithubPages
    ? "/justin-portfolio"
    : undefined,
  assetPrefix: isGithubPages
    ? "/justin-portfolio/"
    : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages
      ? "/justin-portfolio"
      : "",
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
