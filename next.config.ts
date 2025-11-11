import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const API_BASE_URL = process.env.NEXT_PUBLIC_HOST;
const PAYLOAD_URL =
  process.env.NEXT_PUBLIC_PAYLOAD_CMS_URL || "http://localhost:3001";
const PAYLOAD_URL_OBJ = new URL(PAYLOAD_URL);

const CLOUDFRONT_URL = process.env.NEXT_PUBLIC_CLOUDFRONT_URL;
const S3_ENDPOINT = process.env.NEXT_PUBLIC_S3_ENDPOINT;
const S3_BUCKET = process.env.NEXT_PUBLIC_S3_BUCKET;
const S3_REGION = process.env.NEXT_PUBLIC_S3_REGION;
// Use NEXT_PUBLIC_HOST as the backend base URL for image remotePatterns
const BACKEND_URL = API_BASE_URL || "http://localhost:8000/v1";
const BACKEND_URL_OBJ = new URL(BACKEND_URL);
const BACKEND_UPLOADS_PATH = `${BACKEND_URL_OBJ.pathname.replace(/\/$/, "")}/uploads/**`;

const nextConfig: NextConfig = {
  output: "standalone", // Commented out for development - uncomment for production builds
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      // Existing CloudFront allowlist
      {
        protocol: "https",
        hostname: "dsedw24h3xr0r.cloudfront.net",
        port: "",
        pathname: "/**",
      },
      // Backend API host to serve locally stored uploads (stories/posts/avatars/logos)
      {
        protocol: (BACKEND_URL_OBJ.protocol.replace(":", "") === "https"
          ? "https"
          : "http") as "http" | "https",
        hostname: BACKEND_URL_OBJ.hostname,
        port: BACKEND_URL_OBJ.port || "",
        pathname: BACKEND_UPLOADS_PATH,
      },
      // Payload CMS host
      {
        protocol: (PAYLOAD_URL_OBJ.protocol.replace(":", "") === "https"
          ? "https"
          : "http") as "http" | "https",
        hostname: PAYLOAD_URL_OBJ.hostname,
        port: PAYLOAD_URL_OBJ.port || "",
        pathname: "/**",
      },
      // Optional: custom CloudFront from env
      ...(CLOUDFRONT_URL
        ? [
            {
              protocol: (new URL(CLOUDFRONT_URL).protocol.replace(":", "") ===
              "https"
                ? "https"
                : "http") as "http" | "https",
              hostname: new URL(CLOUDFRONT_URL).hostname,
              port: new URL(CLOUDFRONT_URL).port || "",
              pathname: "/**",
            } as const,
          ]
        : []),
      // Optional: S3 endpoint host
      ...(S3_ENDPOINT
        ? [
            {
              protocol: (new URL(S3_ENDPOINT).protocol.replace(":", "") ===
              "https"
                ? "https"
                : "http") as "http" | "https",
              hostname: new URL(S3_ENDPOINT).hostname,
              port: new URL(S3_ENDPOINT).port || "",
              pathname: "/**",
            } as const,
          ]
        : []),
      // Optional: standard AWS S3 virtual-hosted–style URL
      ...(S3_BUCKET && S3_REGION
        ? [
            {
              protocol: "https",
              hostname: `${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com`,
              port: "",
              pathname: "/**",
            } as const,
          ]
        : []),
      // External images used in mock data
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // Ensure static files are properly served in standalone mode
  async headers() {
    return [
      {
        // Apply plain text headers only to actual .txt files in /public/articles
        // Avoids overriding HTML Content-Type for the /articles/[id] page route
        source: "/articles/:path*.txt",
        headers: [
          {
            key: "Content-Type",
            value: "text/plain; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=3600",
          },
        ],
      },
    ];
  },
  // async rewrites() {
  //   if (!API_BASE_URL) {
  //     throw new Error(
  //       "NEXT_PUBLIC_HOST is not defined in the environment variables.",
  //     );
  //   }

  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: `${process.env.NEXT_PUBLIC_HOST}/:path*`,
  //     },
  //   ];
  // },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
