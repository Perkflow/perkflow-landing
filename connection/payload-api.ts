import axios from "axios";
import type {
  CMSPost,
  CMSCategory,
  CMSPaginatedResponse,
  CMSPostFilters,
  CMSCategoryFilters,
} from "@/types/cms";

// Payload CMS API Configuration
const PAYLOAD_CMS_BASE_URL =
  process.env.PAYLOAD_CMS_URL || "https://cms.perkflow.io";

const isServer = typeof window === "undefined";

async function serverFetchJSON<T>(
  input: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, init);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

// Legacy type aliases for backward compatibility
export type PayloadPost = CMSPost;
export type PayloadResponse<T> = CMSPaginatedResponse<T>;
export type PayloadFindParams = CMSPostFilters;

class PayloadAPI {
  private baseURL: string;

  constructor() {
    this.baseURL = PAYLOAD_CMS_BASE_URL;
  }

  // Posts API
  async getPosts(
    filters?: CMSPostFilters
  ): Promise<CMSPaginatedResponse<CMSPost>> {
    try {
      // On the server, fetch directly from Payload CMS to avoid a self HTTP hop
      if (isServer) {
        const queryParams = new URLSearchParams();
        const page = (filters?.page ?? 1).toString();
        const limit = (filters?.limit ?? 10).toString();
        const sort = (filters?.sort ?? "-publishedAt").toString();
        const status = (filters?.status ?? "published").toString();
        const locale = (filters?.locale ?? "en").toString();

        queryParams.set("locale", locale);
        queryParams.set("page", page);
        queryParams.set("limit", limit);
        queryParams.set("sort", sort);
        queryParams.set("depth", "2");
        queryParams.set("where[status][equals]", status);

        // Optional category by slug -> id lookup
        if (filters?.category) {
          try {
            const catParams = new URLSearchParams({
              where: JSON.stringify({ slug: { equals: filters.category } }),
              limit: "1",
            });
            const catData = await serverFetchJSON<
              CMSPaginatedResponse<CMSCategory>
            >(
              `${PAYLOAD_CMS_BASE_URL}/api/categories?${catParams.toString()}`,
              { cache: "no-store" }
            );
            const categoryId = catData?.docs?.[0]?.id;
            if (categoryId) {
              queryParams.set("where[category][equals]", categoryId);
            }
          } catch (e) {
            // Best-effort; if categories endpoint fails, proceed without category filter
            console.warn("Category lookup failed:", e);
          }
        }

        if (filters?.search) {
          queryParams.append("search", filters.search.toString());
        }

        const data = await serverFetchJSON<CMSPaginatedResponse<CMSPost>>(
          `${PAYLOAD_CMS_BASE_URL}/api/posts?${queryParams.toString()}`,
          { next: { revalidate: 300 } }
        );
        return data;
      }

      // In the browser, go through our Next.js API route
      const queryParams = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, value.toString());
          }
        });
      }
      const url = `/api/cms/posts?${queryParams.toString()}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw new Error("Failed to fetch posts from CMS");
    }
  }

  async getPostBySlug(slug: string, locale: string): Promise<CMSPost | null> {
    try {
      if (isServer) {
        // Try language-specific slug first (if not English)
        if (locale !== "en") {
          const localizedQueryParams = new URLSearchParams();
          localizedQueryParams.set("where[languageSlugs.slug][equals]", slug);
          localizedQueryParams.set("where[status][equals]", "published");
          localizedQueryParams.set("limit", "1");
          localizedQueryParams.set("depth", "2");
          localizedQueryParams.set("locale", locale);

          const localizedData = await serverFetchJSON<{
            docs?: CMSPost[];
          }>(
            `${PAYLOAD_CMS_BASE_URL}/api/posts?${localizedQueryParams.toString()}`,
            {
              cache: "no-store",
            }
          );

          const localizedDoc =
            (localizedData?.docs && localizedData.docs[0]) || null;
          if (localizedDoc) {
            return localizedDoc;
          }
        }

        // Fallback to default slug
        const queryParams = new URLSearchParams();
        queryParams.set("where[slug][equals]", slug);
        queryParams.set("where[status][equals]", "published");
        queryParams.set("limit", "1");
        queryParams.set("depth", "2");
        queryParams.set("locale", locale);
        const data = await serverFetchJSON<{
          docs?: CMSPost[];
        }>(`${PAYLOAD_CMS_BASE_URL}/api/posts?${queryParams.toString()}`, {
          cache: "no-store",
        });
        const doc = (data?.docs && data.docs[0]) || null;
        return doc ?? null;
      }
      const response = await axios.get(`/api/cms/posts/${slug}`);
      return response.data as CMSPost | null;
    } catch (error) {
      console.error("Error fetching post by slug:", error);
      return null;
    }
  }

  async getPostById(id: string): Promise<CMSPost | null> {
    try {
      if (isServer) {
        const data = await serverFetchJSON<CMSPost | null>(
          `${PAYLOAD_CMS_BASE_URL}/api/posts/${id}`,
          { cache: "no-store" }
        );
        return data;
      }
      const response = await axios.get(`/api/cms/posts/by-id/${id}`);
      return response.data as CMSPost | null;
    } catch (error) {
      console.error("Error fetching post by ID:", error);
      return null;
    }
  }

  // Categories API
  async getCategories(
    filters?: CMSCategoryFilters
  ): Promise<CMSPaginatedResponse<CMSCategory>> {
    try {
      if (isServer) {
        const queryParams = new URLSearchParams();
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              if (key === "featured") {
                queryParams.append("where[featured][equals]", value.toString());
              } else {
                queryParams.append(key, value.toString());
              }
            }
          });
        }
        const data = await serverFetchJSON<CMSPaginatedResponse<CMSCategory>>(
          `${PAYLOAD_CMS_BASE_URL}/api/categories?${queryParams.toString()}`,
          { next: { revalidate: 300 } }
        );
        return data;
      }
      const queryParams = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, value.toString());
          }
        });
      }
      const response = await axios.get(
        `/api/cms/categories?${queryParams.toString()}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw new Error("Failed to fetch categories from CMS");
    }
  }

  async getCategoryBySlug(slug: string): Promise<CMSCategory | null> {
    try {
      const origin =
        typeof window === "undefined"
          ? process.env.NEXT_PUBLIC_APP_URL ||
            (process.env.VERCEL_URL
              ? `https://${process.env.VERCEL_URL}`
              : "http://localhost:3000")
          : "";
      const response = await axios.get(`${origin}/api/cms/categories/${slug}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching category by slug:", error);
      return null;
    }
  }

  // Search functionality
  async searchPosts(
    query: string,
    filters?: Omit<CMSPostFilters, "search">
  ): Promise<CMSPaginatedResponse<CMSPost>> {
    return this.getPosts({ ...filters, search: query });
  }

  // Featured content
  async getFeaturedPosts(
    limit: number = 5
  ): Promise<CMSPaginatedResponse<CMSPost>> {
    return this.getPosts({
      limit,
      sort: "-publishedAt",
      status: "published",
    });
  }

  async getFeaturedCategories(): Promise<CMSPaginatedResponse<CMSCategory>> {
    return this.getCategories({ featured: true });
  }
}

export const payloadAPI = new PayloadAPI();
