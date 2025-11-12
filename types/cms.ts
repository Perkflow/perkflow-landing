// CMS Types for Payload CMS Integration

export interface CMSUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roles: "admin" | "staff" | Array<"admin" | "staff">;
  createdAt: string;
  updatedAt: string;
}

export interface CMSCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CMSMedia {
  id: string;
  alt: string;
  url?: string;
  thumbnailURL?: string;
  filename?: string;
  normalizedPath?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
  focalX?: number;
  focalY?: number;
  prefix?: string;
  staticURL?: string;
  sizes?: {
    [key: string]: {
      url?: string;
      filename?: string;
      width?: number;
      height?: number;
      prefix?: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface CMSPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: any; // Lexical editor content
  category: CMSCategory;
  author: CMSUser;
  featuredImage?: CMSMedia;
  status: "draft" | "pending" | "published" | "archived";
  approved: boolean;
  approvedBy?: CMSUser;
  approvedAt?: string;
  publishedAt?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface CMSPaginatedResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface CMSPostFilters {
  page?: number;
  limit?: number;
  category?: string;
  status?: string;
  search?: string;
  sort?: string;
  featured?: boolean;
  locale?: string;
}

export interface CMSCategoryFilters {
  featured?: boolean;
  sort?: string;
}

// Frontend Article interface (compatible with existing code)
export interface Article {
  id: string;
  title: string;
  author: string;
  time: string;
  image: string;
  filePath: string;
  content: any; // Allow Lexical JSON object
  contentPreview: string;
  // Additional CMS fields
  slug?: string;
  excerpt?: string;
  category?: {
    id: string;
    name: string;
    slug: string;
    color?: string;
  };
  tags?: string[];
  publishedAt?: string;
  featuredImage?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
    originalUrl?: string;
    normalizedPath?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}
