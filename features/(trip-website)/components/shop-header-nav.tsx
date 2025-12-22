"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
    Gift,
    Plane,
    Sparkles,
    Building2,
    Smartphone,
    Phone,
    Watch,
} from "lucide-react";
import Container from "@/components/layouts/container";
import { topNavCategories } from "@/features/(trip-website)/shop/data/products";

const iconMap = {
    Gift,
    Plane,
    Sparkles,
    Building2,
    Gadget: Smartphone,
    Phone,
    Smartphone, // Fallback if needed
    Watch,
};

interface ShopHeaderNavProps {
    children?: React.ReactNode;
}

export function ShopHeaderNav({ children }: ShopHeaderNavProps) {
    const t = useTranslations("Shop_Page");

    return (
        <div className="border-b border-gray-200 bg-white sticky top-0 z-40 relative pt-20">
            <Container className="flex items-center justify-between gap-8 py-5">
                <nav className="flex items-center gap-8 overflow-x-auto sm:gap-12 scrollbar-hide">
                    {topNavCategories.map((cat) => {
                        const Icon = iconMap[cat.icon as keyof typeof iconMap] || Phone;
                        // Determine active state is tricky here because we are in a shared component.
                        // We can use usePathname if we want to auto-highlight, or just let it link.
                        // But wait, the previous implementation used `cat.id === "currentPage"` check.
                        // Let's use usePathname to determine active state automatically.

                        return (
                            <NavLink
                                key={cat.id}
                                cat={cat}
                                t={t}
                                Icon={Icon}
                            />
                        );
                    })}
                </nav>
                {children}
            </Container>
        </div>
    );
}

import { usePathname } from "@/i18n/navigation";

function NavLink({ cat, t, Icon }: { cat: any, t: any, Icon: any }) {
    const pathname = usePathname();

    // Logic to determine active state based on /shop/* routes
    let isActive = false;
    if (cat.id === "gift-card" && (pathname === "/shop" || pathname.match(/^\/shop\/[^/]+$/))) {
        // Active for /shop and /shop/[slug] (product detail pages)
        // But not for /shop/flights, /shop/hotels, etc.
        if (!pathname.match(/^\/shop\/(flights|experiences|hotels|gadgets|mobile-topup)/)) {
            isActive = true;
        }
    } else if (pathname.includes(`/shop/${cat.id}`)) {
        isActive = true;
    }

    // Build href - all routes are now under /shop
    const href = cat.id === "gift-card" ? "/shop" : `/shop/${cat.id}`;

    return (
        <Link
            href={href}
            className={`flex shrink-0 flex-col items-center gap-2 transition-colors hover:text-gray-900 group ${isActive ? "text-[#005C73]" : "text-gray-500"}`}
        >
            <Icon className={`h-6 w-6 ${isActive ? "stroke-2" : "stroke-[1.5]"}`} />
            <span className={`whitespace-nowrap text-xs font-medium ${isActive ? "font-semibold" : ""}`}>
                {t(cat.labelKey)}
            </span>
        </Link>
    )
}
