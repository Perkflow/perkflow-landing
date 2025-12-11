import { NextRequest, NextResponse } from "next/server";

const PAYLOAD_CMS_BASE_URL =
  process.env.PAYLOAD_CMS_URL ||
  process.env.NEXT_PUBLIC_PAYLOAD_CMS_URL ||
  "https://cms.perkflow.io";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // First try to find by languageSlugs (for localized slugs)
    let queryParams = new URLSearchParams();
    queryParams.set("where[languageSlugs.slug][equals]", slug);
    queryParams.set("where[status][equals]", "published");
    queryParams.set("limit", "1");
    queryParams.set("depth", "2");

    let response = await fetch(
      `${PAYLOAD_CMS_BASE_URL}/api/posts?${queryParams.toString()}`
    );

    if (!response.ok) {
      throw new Error(`CMS API error: ${response.status}`);
    }

    let data = await response.json();

    // If not found in languageSlugs, try default slug field
    if (!data.docs || data.docs.length === 0) {
      queryParams = new URLSearchParams();
      queryParams.set("where[slug][equals]", slug);
      queryParams.set("where[status][equals]", "published");
      queryParams.set("limit", "1");
      queryParams.set("depth", "2");

      response = await fetch(
        `${PAYLOAD_CMS_BASE_URL}/api/posts?${queryParams.toString()}`
      );

      if (!response.ok) {
        throw new Error(`CMS API error: ${response.status}`);
      }

      data = await response.json();

      if (!data.docs || data.docs.length === 0) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }
    }

    const doc = data.docs[0];

    // Additional server-side check to ensure post is published
    if (doc.status !== "published") {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    if (doc?.featuredImage) {
      const img = doc.featuredImage;
      const candidate = img?.url || img?.thumbnailURL || "";
      if (candidate) {
        try {
          const u = new URL(candidate, PAYLOAD_CMS_BASE_URL);
          if (u.pathname.startsWith("/media/")) {
            doc.featuredImage.normalizedPath = u.pathname;
          }
        } catch {}
      }
    }

    return NextResponse.json(doc, {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=600", // 5 min cache, 10 min CDN
      },
    });
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}
