"use client";

import Container from "@/components/layouts/container";
import { useTranslations } from "next-intl";
import {
  Gift,
  Plane,
  Sparkles,
  Building2,
  Smartphone,
  Phone,
} from "lucide-react";
import { topNavCategories } from "../data/products";
import { cn } from "@/lib/utils";
import type { TopNavCategory } from "../types/shop";

const iconMap = {
  Gift,
  Plane,
  Sparkles,
  Building2,
  Smartphone,
  Phone,
};

interface CategoryNavProps {
  activeCategory?: TopNavCategory;
  onCategoryChange?: (category: TopNavCategory) => void;
}

export default function CategoryNav({
  activeCategory = "gift-card",
  onCategoryChange,
}: CategoryNavProps) {
  const t = useTranslations("Shop_Page");

  return (
    <div className="border-b bg-white">
      <Container>
        <nav className="scrollbar-hide flex items-center gap-1 overflow-x-auto py-4 sm:gap-2">
          {topNavCategories.map((category) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap];
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange?.(category.id)}
                className={cn(
                  "flex shrink-0 flex-col items-center gap-1 rounded-lg px-4 py-2 text-xs font-medium transition-colors sm:flex-row sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="whitespace-nowrap">{t(category.labelKey)}</span>
              </button>
            );
          })}
        </nav>
      </Container>
    </div>
  );
}
