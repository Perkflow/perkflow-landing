"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import SearchBar from "./search-bar";
import CategorySidebar from "./category-sidebar";
import ProductGrid from "./product-grid";
import Pagination from "./pagination";
import type { GiftCardProduct, GiftCardCategory } from "../types/shop";
import {
  filterProducts,
  paginateProducts,
  ITEMS_PER_PAGE,
} from "../data/products";

interface ShopFiltersProps {
  initialProducts: GiftCardProduct[];
  initialCategory: string;
  initialSearch: string;
  initialPage: number;
}

export default function ShopFilters({
  initialProducts,
  initialCategory,
  initialSearch,
  initialPage,
}: ShopFiltersProps) {
  const [category, setCategory] = useState<GiftCardCategory>(
    initialCategory as GiftCardCategory
  );
  const [search, setSearch] = useState(initialSearch);
  const [page, setPage] = useState(initialPage);
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Shop_Page");

  const filteredProducts = useMemo(() => {
    return filterProducts(initialProducts, { category, search });
  }, [initialProducts, category, search]);

  const { products, pagination } = useMemo(() => {
    return paginateProducts(filteredProducts, page, ITEMS_PER_PAGE);
  }, [filteredProducts, page]);

  const updateURL = (
    newCategory: string,
    newSearch: string,
    newPage: number
  ) => {
    const params = new URLSearchParams();
    if (newCategory !== "all") params.set("category", newCategory);
    if (newSearch) params.set("search", newSearch);
    if (newPage > 1) params.set("page", String(newPage));
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const handleCategoryChange = (newCategory: GiftCardCategory) => {
    setCategory(newCategory);
    setPage(1);
    updateURL(newCategory, search, 1);
  };

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
    setPage(1);
    updateURL(category, newSearch, 1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateURL(category, search, newPage);
    // Scroll to top of product grid
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  return (
    <div className="py-8">
      <SearchBar
        value={search}
        onChange={handleSearchChange}
        placeholder={t("search.placeholder")}
      />

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        <aside>
          <CategorySidebar
            activeCategory={category}
            onCategoryChange={handleCategoryChange}
          />
        </aside>

        <main>
          <div className="mb-6 flex items-center justify-end">
            <p className="text-sm text-gray-500">
              {t("resultsCount", { count: pagination.totalItems })}
            </p>
          </div>
          <ProductGrid products={products} />
          {pagination.totalPages > 1 && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </main>
      </div>
    </div>
  );
}
