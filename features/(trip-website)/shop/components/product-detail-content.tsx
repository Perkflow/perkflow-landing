"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Gift,
  Plane,
  Sparkles,
  Building2,
  Smartphone,
  Phone,
  Monitor,
  Zap,
  Clock,
  Minus,
  Plus,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Container from "@/components/layouts/container";
import type { GiftCardProduct } from "../types/shop";
import { topNavCategories } from "../data/products";
import { toast } from "sonner";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";

const iconMap = {
  Gift,
  Plane,
  Sparkles,
  Building2,
  Smartphone,
  Phone,
};

interface ProductDetailContentProps {
  product: GiftCardProduct;
  locale: string;
}

export default function ProductDetailContent({
  product,
  locale,
}: ProductDetailContentProps) {
  const t = useTranslations("Shop_Page");
  const [selectedAmount, setSelectedAmount] = useState(product.denominations[0]);
  const [descriptionOpen, setDescriptionOpen] = useState(true);
  const [termsOpen, setTermsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const description =
    product.description[locale as "en" | "fr"] || product.description.en;

  const handleAddToCart = () => {
    toast.success(t("productDetail.addedToCart"));
  };

  const incrementAmount = () => {
    const currentIndex = product.denominations.indexOf(selectedAmount);
    if (currentIndex < product.denominations.length - 1) {
      setSelectedAmount(product.denominations[currentIndex + 1]);
    }
  };

  const decrementAmount = () => {
    const currentIndex = product.denominations.indexOf(selectedAmount);
    if (currentIndex > 0) {
      setSelectedAmount(product.denominations[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8F5]">
      {/* Spacer for fixed header */}
      <div className="h-16" />

      {/* Top Navigation Bar */}
      <div className="border-b border-gray-200 bg-white">
        <Container className="flex items-center justify-between gap-8 py-5">
          <nav className="flex items-center gap-8 overflow-x-auto sm:gap-12">
            {topNavCategories.map((cat) => {
              const Icon = iconMap[cat.icon as keyof typeof iconMap];
              return (
                <button
                  key={cat.id}
                  className="flex shrink-0 flex-col items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
                >
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                  <span className="whitespace-nowrap text-xs font-medium">
                    {t(cat.labelKey)}
                  </span>
                </button>
              );
            })}
          </nav>
          <div className="relative hidden sm:block sm:w-80 lg:w-96">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder={t("search.placeholder")}
              className="h-12 rounded-full border-gray-300 bg-gray-50 pl-12 pr-4 focus:bg-white"
            />
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="py-10">
        <div className="mb-6">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Column - Product Info */}
          <div>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                {product.brandName}
              </h1>
            </div>

            {/* Tags */}
            <div className="mb-10 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-transparent px-4 py-1.5 text-sm font-medium text-gray-600">
                <Monitor className="h-4 w-4" />
                {t("productDetail.redeemOnline")}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-transparent px-4 py-1.5 text-sm font-medium text-gray-600">
                <Zap className="h-4 w-4" />
                {t("productDetail.instant")}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-transparent px-4 py-1.5 text-sm font-medium text-gray-600">
                <Clock className="h-4 w-4" />
                {t("productDetail.noExpiry")}
              </span>
            </div>

            {/* Collapsible Sections */}
            <div className="space-y-0">
              {/* Description */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => setDescriptionOpen(!descriptionOpen)}
                  className="flex w-full items-center justify-between py-5 text-left"
                >
                  <h2 className="text-lg font-medium text-gray-700">
                    {t("productDetail.description")}
                  </h2>
                  {descriptionOpen ? (
                    <Minus className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Plus className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {descriptionOpen && (
                  <div className="pb-5 text-sm leading-relaxed text-gray-600">
                    <p>{description}</p>
                  </div>
                )}
              </div>

              {/* Terms */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => setTermsOpen(!termsOpen)}
                  className="flex w-full items-center justify-between py-5 text-left"
                >
                  <h2 className="text-lg font-medium text-gray-700">
                    {t("productDetail.terms")}
                  </h2>
                  {termsOpen ? (
                    <Minus className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Plus className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {termsOpen && (
                  <div className="pb-5 text-sm leading-relaxed text-gray-600">
                    <p>{t("productDetail.termsContent")}</p>
                  </div>
                )}
              </div>

              {/* About */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => setAboutOpen(!aboutOpen)}
                  className="flex w-full items-center justify-between py-5 text-left"
                >
                  <h2 className="text-lg font-medium text-gray-700">
                    {t("productDetail.about")} {product.brandName}
                  </h2>
                  {aboutOpen ? (
                    <Minus className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Plus className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {aboutOpen && (
                  <div className="pb-5 text-sm leading-relaxed text-gray-600">
                    <p>{description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Card & Purchase */}
          <div className="sticky top-24">
            <div className="bg-white p-8 rounded-[32px] shadow-sm ring-1 ring-gray-100">
              <div className="flex flex-col items-center">
                {/* Card Image */}
                <div
                  className="mb-10 flex aspect-[1.586/1] w-full max-w-[380px] items-center justify-center rounded-xl shadow-md transition-transform hover:scale-[1.02]"
                  style={{ backgroundColor: product.backgroundColor || "#000000" }}
                >
                  <span
                    className={`text-4xl font-bold tracking-tight ${isLightBackground(product.backgroundColor)
                      ? "text-gray-900"
                      : "text-white"
                      }`}
                  >
                    {product.brandName}
                  </span>
                </div>

                {/* Amount Selector */}
                <div className="mb-2 flex w-full max-w-[380px] items-center justify-between gap-4">
                  <button
                    onClick={decrementAmount}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)] hover:bg-gray-50 active:scale-95 transition-all"
                  >
                    <Minus className="h-6 w-6 text-gray-600" />
                  </button>
                  <span className="text-4xl font-medium text-[#005C73]">
                    {selectedAmount} €
                  </span>
                  <button
                    onClick={incrementAmount}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)] hover:bg-gray-50 active:scale-95 transition-all"
                  >
                    <Plus className="h-6 w-6 text-gray-600" />
                  </button>
                </div>

                {/* Dotted Separator */}
                <div className="w-full border-t border-dotted border-gray-300 my-6" />

                {/* Price Range */}
                <div className="mb-8 text-center">
                  <p className="text-sm text-gray-400">
                    ( {product.denominations[0]}€ à{" "}
                    {product.denominations[product.denominations.length - 1]}€ )
                  </p>
                </div>

                {/* Quick Amount Buttons */}
                <div className="mb-10 flex flex-wrap justify-center gap-3 w-full max-w-[380px]">
                  {product.denominations.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setSelectedAmount(amount)}
                      className={`min-w-[90px] rounded-full px-6 py-3 text-sm font-medium transition-all ${selectedAmount === amount
                        ? "bg-[#005C73] text-white shadow-md hover:bg-[#004a5c]"
                        : "border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                    >
                      {amount}€
                    </button>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="w-full max-w-[380px] space-y-4">
                  <Button
                    variant="outline"
                    className="h-14 w-full rounded-full border-2 border-[#E8E0D5] text-[#005C73] hover:bg-[#FAF6F3] hover:text-[#004a5c] text-base font-medium"
                  >
                    {t("productDetail.sendToFriend")}
                  </Button>
                  <Button
                    onClick={handleAddToCart}
                    className="h-14 w-full rounded-full bg-[#005C73] text-white hover:bg-[#004a5c] text-base font-medium shadow-lg shadow-[#005C73]/20"
                  >
                    {t("productDetail.addToCart")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function isLightBackground(color?: string): boolean {
  if (!color) return true;
  const lightColors = ["#FFFFFF", "#FFC72C", "#ffffff"];
  return lightColors.includes(color.toUpperCase());
}
