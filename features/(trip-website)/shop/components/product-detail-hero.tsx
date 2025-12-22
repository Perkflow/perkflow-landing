import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import type { GiftCardProduct } from "../types/shop";
import DenominationSelector from "./denomination-selector";
import CartButton from "./cart-button";

interface ProductDetailHeroProps {
  product: GiftCardProduct;
  locale: string;
}

export default async function ProductDetailHero({
  product,
  locale,
}: ProductDetailHeroProps) {
  const t = await getTranslations("Shop_Page.productDetail");
  const description =
    product.description[locale as "en" | "fr"] || product.description.en;

  const categoryLabels: Record<string, string> = {
    "fashion-lifestyle": t("categories.fashionLifestyle"),
    "food-restaurant": t("categories.foodRestaurant"),
    gaming: t("categories.gaming"),
    grocery: t("categories.grocery"),
    "travel-entertainment": t("categories.travelEntertainment"),
    "wellness-sport": t("categories.wellnessSport"),
  };

  return (
    <div>
      <Link
        href="/shop"
        className="mb-6 inline-flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("backToShop")}
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Product Image Card */}
        <Card className="overflow-hidden border-0 shadow-lg">
          <CardContent
            className="flex min-h-[300px] items-center justify-center p-8 lg:min-h-[400px]"
            style={{ backgroundColor: product.backgroundColor || "#f5f5f5" }}
          >
            <span
              className={`text-4xl font-bold lg:text-5xl ${
                isLightBackground(product.backgroundColor)
                  ? "text-gray-900"
                  : "text-white"
              }`}
            >
              {product.brandName}
            </span>
          </CardContent>
        </Card>

        {/* Product Info */}
        <div className="flex flex-col gap-6">
          <div>
            <Badge variant="secondary" className="mb-3">
              {categoryLabels[product.category] || product.category}
            </Badge>
            <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              {description}
            </p>
          </div>

          <DenominationSelector
            denominations={product.denominations}
            currency={product.currency}
            label={t("selectAmount")}
          />

          <div className="pt-4">
            <CartButton
              label={t("addToCart")}
              successMessage={t("addedToCart")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function isLightBackground(color?: string): boolean {
  if (!color) return true;
  const lightColors = ["#FFFFFF", "#FFC72C", "#ffffff"];
  return lightColors.includes(color.toUpperCase());
}
