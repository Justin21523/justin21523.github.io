import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const isGithubPages =
  process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  experimental: {
    cpus: 1,
  },
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
      {
        protocol: "https",
        hostname: "justin21523.github.io",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
