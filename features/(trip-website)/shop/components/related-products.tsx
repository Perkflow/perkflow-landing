import { getTranslations } from "next-intl/server";
import type { GiftCardProduct } from "../types/shop";
import ProductCard from "./product-card";

interface RelatedProductsProps {
  products: GiftCardProduct[];
}

export default async function RelatedProducts({
  products,
}: RelatedProductsProps) {
  const t = await getTranslations("Shop_Page.productDetail");

  if (products.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        {t("relatedProducts")}
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
