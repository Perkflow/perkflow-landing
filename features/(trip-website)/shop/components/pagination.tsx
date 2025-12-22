"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const t = useTranslations("Shop_Page.pagination");

  const getPageNumbers = (): number[] => {
    const pages: number[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first few pages
      for (let i = 1; i <= Math.min(maxVisible, totalPages); i++) {
        pages.push(i);
      }
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 disabled:opacity-40 disabled:hover:text-gray-500"
      >
        <ChevronLeft className="h-4 w-4" />
        {t("prev")}
      </button>

      <div className="flex items-center gap-1">
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`flex h-8 w-8 items-center justify-center rounded text-sm font-medium transition-colors ${
              currentPage === page
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 disabled:opacity-40 disabled:hover:text-gray-500"
      >
        {t("next")}
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
