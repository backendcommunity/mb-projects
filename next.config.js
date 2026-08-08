/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  // SEO: /projects was the listing page on the old site (362 clicks/90d, position
  // 5.2 for "backend projects"). This app uses / as the listing page, so redirect
  // rather than 404. This also resolves the three-way cannibalisation on that term
  // between /projects, / and /projects/tags/advanced-backend-projects.
  //
  // Must NOT catch /projects/[slug] or /projects/tags/* — `source` is an exact match,
  // so nested paths are unaffected.
  async redirects() {
    return [
      {
        source: "/projects",
        destination: "/",
        permanent: true, // 308/301 — passes link equity
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
