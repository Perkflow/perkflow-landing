import { NextRequest, NextResponse } from "next/server";

const PAYLOAD_CMS_BASE_URL =
  process.env.PAYLOAD_CMS_URL ||
  process.env.NEXT_PUBLIC_PAYLOAD_CMS_URL ||
  "https://cms.perkflow.io";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const locale = request.nextUrl.searchParams.get("locale") || "en";

    const queryParams = new URLSearchParams();
    queryParams.set("depth", "2");
    queryParams.set("locale", locale);
    queryParams.set("fallback-locale", "none");

    const response = await fetch(
      `${PAYLOAD_CMS_BASE_URL}/api/posts/${id}?${queryParams.toString()}`
    );

    if (!response.ok) {
      throw new Error(`CMS API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const doc = data;

    if (doc.status && doc.status !== "published") {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
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
        "Cache-Control": "public, max-age=300, s-maxage=600",
      },
    });
  } catch (error) {
    console.error("Error fetching post by id:", error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}
