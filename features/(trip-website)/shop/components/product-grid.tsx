import type { GiftCardProduct } from "../types/shop";
import ProductCard from "./product-card";
import { useTranslations } from "next-intl";

interface ProductGridProps {
  products: GiftCardProduct[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const t = useTranslations("Shop_Page");

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl">🔍</div>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">
          {t("noResults.title")}
        </h3>
        <p className="mt-2 text-gray-500">{t("noResults.description")}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
