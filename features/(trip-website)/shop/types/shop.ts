export type GiftCardCategory =
  | "all"
  | "fashion-lifestyle"
  | "food-restaurant"
  | "gaming"
  | "grocery"
  | "travel-entertainment"
  | "wellness-sport";

export type TopNavCategory =
  | "gift-card"
  | "flights"
  | "experience"
  | "hotels"
  | "gadgets"
  | "mobile-topup";

export interface GiftCardProduct {
  id: string;
  slug: string;
  name: string;
  brandName: string;
  category: GiftCardCategory;
  image: string;
  backgroundColor?: string;
  description: {
    en: string;
    fr: string;
  };
  denominations: number[];
  currency: string;
  featured?: boolean;
}

export interface ShopFilters {
  category: GiftCardCategory;
  search: string;
  page: number;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface CategoryItem {
  id: GiftCardCategory;
  labelKey: string;
}

export interface TopNavItem {
  id: TopNavCategory;
  labelKey: string;
  icon: string;
}
