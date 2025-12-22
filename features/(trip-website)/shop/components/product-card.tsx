import { Link } from "@/i18n/navigation";
import type { GiftCardProduct } from "../types/shop";

interface ProductCardProps {
  product: GiftCardProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-200 hover:shadow-xl">
        {/* Brand Logo Area */}
        <div
          className="flex h-40 items-center justify-center rounded-t-2xl"
          style={{ backgroundColor: product.backgroundColor || "#f5f5f5" }}
        >
          <span
            className={cn(
              "text-2xl font-bold tracking-tight",
              isLightBackground(product.backgroundColor)
                ? "text-gray-900"
                : "text-white"
            )}
          >
            {product.brandName}
          </span>
        </div>
        {/* Brand Name */}
        <div className="bg-white px-4 py-4">
          <h3 className="text-sm font-medium text-gray-800">
            {product.brandName}
          </h3>
        </div>
      </div>
    </Link>
  );
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

function isLightBackground(color?: string): boolean {
  if (!color) return true;
  const lightColors = ["#FFFFFF", "#FFC72C", "#ffffff"];
  return lightColors.includes(color.toUpperCase());
}
