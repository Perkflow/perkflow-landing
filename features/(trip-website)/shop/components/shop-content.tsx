"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import Image from "next/image";
import { useDebouncedCallback } from "use-debounce";
import Container from "@/components/layouts/container";
import ProductGrid from "./product-grid";
import Pagination from "./pagination";
import type { GiftCardProduct, GiftCardCategory } from "../types/shop";
import {
  filterProducts,
  paginateProducts,
  ITEMS_PER_PAGE,
  categories,
} from "../data/products";
import { cn } from "@/lib/utils";

interface ShopContentProps {
  initialProducts: GiftCardProduct[];
  initialCategory: string;
  initialSearch: string;
  initialPage: number;
}

export default function ShopContent({
  initialProducts,
  initialCategory,
  initialSearch,
  initialPage,
}: ShopContentProps) {
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

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
    updateURL(category, value, 1);
  }, 300);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateURL(category, search, newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Hero Section */}
      <div className="w-full bg-linear-to-r from-[#E0F7FA]/40 to-[#FFF3E0]/40 py-12 md:py-20">
        <Container>
          <div className="grid gap-12 items-center md:grid-cols-2">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] mb-6 tracking-tight">
                {t("hero.heading")}
              </h1>
              <p className="text-lg text-gray-600 md:text-xl leading-relaxed max-w-lg">
                {t("hero.subheading")}
              </p>
            </div>
            <div className="relative flex justify-center md:justify-end">
              <div className="relative w-full max-w-[600px] aspect-4/3 md:h-[400px] lg:h-[450px]">
                <Image
                  src="/shop/hero-cards.png"
                  alt="Gift Cards"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="py-6">
        <div className="flex gap-10">
          {/* Sidebar */}
          <aside className="hidden w-56 shrink-0 lg:block">
            <div className="sticky top-20 rounded-2xl border border-gray-200 bg-white p-5">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                {t("sidebar.title")}
              </h3>
              <ul className="space-y-0.5">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => handleCategoryChange(cat.id)}
                      className={cn(
                        "w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                        category === cat.id
                          ? "bg-primary/10 font-medium text-primary"
                          : "text-gray-600 hover:bg-gray-50"
                      )}
                    >
                      {t(cat.labelKey)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
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
      </Container>
    </>
  );
}
