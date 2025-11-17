import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/participant/",
          "/api/",
          "/auth-callback",
          "/invite/",
          "/linkedin-callback",
        ],
      },
    ],
    sitemap: "https://perkflow.io/sitemap.xml",
  };
}
