"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Search } from "lucide-react";
import Container from "@/components/layouts/container";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";

const gadgetCategories = [
    { id: "all", label: "All" },
    { id: "apple", label: "Apple" },
    { id: "samsung", label: "Samsung" },
    { id: "huawei", label: "Huawei" },
    { id: "google", label: "Google Pixel" },
    { id: "techno", label: "Techno" },
    { id: "redmi", label: "Redmi" },
];

const gadgetProducts = [
    {
        id: 1,
        name: "Mac",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?q=80&w=1000&auto=format&fit=crop",
        category: "apple",
    },
    {
        id: 2,
        name: "Iphone",
        image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1000&auto=format&fit=crop",
        category: "apple",
    },
    {
        id: 3,
        name: "ipad",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop",
        category: "apple",
    },
    {
        id: 4,
        name: "Apple Watch",
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000&auto=format&fit=crop",
        category: "apple",
    },
    {
        id: 5,
        name: "AirPods",
        image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?q=80&w=1000&auto=format&fit=crop",
        category: "apple",
    },
];

const featuredGadgets = [
    {
        id: 101,
        name: "iphone 17 Pro",
        price: "1500 €",
        image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=1000&auto=format&fit=crop",
        isDark: true,
    },
    {
        id: 102,
        name: "iphone 16",
        price: "1100 €",
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop",
        isDark: false,
    },
    {
        id: 103,
        name: "iphone 13 Pro",
        price: "800 €",
        image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=1000&auto=format&fit=crop",
        isDark: false,
    },
];

const secondaryGadgets = [
    {
        id: 201,
        name: "AirPods Pro 3",
        price: "320 €",
        image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b666?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: 202,
        name: "MacBook Air",
        price: "999 €",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: 203,
        name: "ipad Air",
        price: "570 €",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop",
    },
];

export default function GadgetsContent() {
    const t = useTranslations("Shop_Page");
    const [activeCategory, setActiveCategory] = useState("apple");

    return (
        <Container className="py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Categories */}
                <div className="w-full lg:w-64 shrink-0">
                    <div className="bg-[#F5F8FB] pt-4">
                        <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-6">CATEGORIES</h2>
                        <div className="space-y-1">
                            {gadgetCategories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-2 py-2 text-sm font-medium transition-colors rounded-lg",
                                        activeCategory === cat.id
                                            ? "text-[#005C73]"
                                            : "text-gray-500 hover:text-gray-900"
                                    )}
                                >
                                    <div className={cn(
                                        "w-2 h-2 rounded-full",
                                        activeCategory === cat.id ? "bg-[#005C73]" : "bg-transparent border border-gray-400"
                                    )} />
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    {/* Top Category Icons Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12 py-20">
                        {gadgetProducts.map((product) => (
                            <div key={product.id} className="flex flex-col items-center gap-4 group cursor-pointer">
                                <div className="w-full aspect-square bg-white rounded-4xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center relative overflow-hidden">
                                    {product.name === "Iphone" && (
                                        <div className="absolute inset-0 bg-[#E0F7FA]/30 blur-xl" />
                                    )}
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                </div>
                                <span className="text-gray-600 font-medium text-sm md:text-base group-hover:text-gray-900">
                                    {product.name}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Featured Rows */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        {featuredGadgets.map((gadget) => (
                            <div
                                key={gadget.id}
                                className={cn(
                                    "rounded-4xl p-8 relative overflow-hidden flex flex-col justify-between transition-all hover:scale-[1.02]",
                                    gadget.isDark ? "bg-[#222222] text-white" : "bg-white text-gray-900"
                                )}
                                style={{ height: '420px' }}
                            >
                                <div>
                                    <h3 className="text-xl font-medium mb-1">{gadget.name}</h3>
                                    <p className={cn("text-2xl font-bold", gadget.isDark ? "text-white" : "text-gray-900")}>
                                        {gadget.price}
                                    </p>
                                </div>
                                <div className="relative w-full h-64 mt-4">
                                    <Image
                                        src={gadget.image}
                                        alt={gadget.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Secondary Rows */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {secondaryGadgets.map((gadget) => (
                            <div
                                key={gadget.id}
                                className="bg-white rounded-4xl p-8 h-[380px] flex flex-col justify-between transition-all hover:shadow-lg hover:scale-[1.02]"
                            >
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-1">{gadget.name}</h3>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {gadget.price}
                                    </p>
                                </div>
                                <div className="relative w-full h-56 mt-4">
                                    <Image
                                        src={gadget.image}
                                        alt={gadget.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    );
}
