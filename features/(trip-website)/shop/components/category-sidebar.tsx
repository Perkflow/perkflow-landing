"use client";

import { useTranslations } from "next-intl";
import { categories } from "../data/products";
import { cn } from "@/lib/utils";
import type { GiftCardCategory } from "../types/shop";

interface CategorySidebarProps {
  activeCategory: GiftCardCategory;
  onCategoryChange: (category: GiftCardCategory) => void;
}

export default function CategorySidebar({
  activeCategory,
  onCategoryChange,
}: CategorySidebarProps) {
  const t = useTranslations("Shop_Page");

  return (
    <div className="sticky top-20 rounded-xl bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
        {t("sidebar.title")}
      </h3>
      <ul className="space-y-1">
        {categories.map((category) => (
          <li key={category.id}>
            <button
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                "w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                activeCategory === category.id
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              {t(category.labelKey)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
