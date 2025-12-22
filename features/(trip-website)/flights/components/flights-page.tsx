"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ShopHeaderNav } from "@/features/(trip-website)/components/shop-header-nav";
import {
    Search,
    Gift,
    Plane,
    Sparkles,
    Building2,
    Smartphone,
    Phone,
    Calendar,
    ChevronDown,
    PlaneTakeoff,
    PlaneLanding,
    Users,
} from "lucide-react";
import Container from "@/components/layouts/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { topNavCategories } from "@/features/(trip-website)/shop/data/products";

const iconMap = {
    Gift,
    Plane,
    Sparkles,
    Building2,
    Smartphone,
    Gadget: Smartphone,
    Phone,
};

const flightDeals = [
    {
        id: 1,
        from: "France",
        to: "Dubai",
        image: "https://images.unsplash.com/photo-1512453979798-5ea904ac6605?q=80&w=1000&auto=format&fit=crop",
        date: "Sep 19, 2025 - 25 Sep 2025",
        class: "Economy Class",
        price: "520€",
    },
    {
        id: 2,
        from: "France",
        to: "Thailand",
        image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1000&auto=format&fit=crop",
        date: "Sep 19, 2025 - 25 Sep 2025",
        class: "Economy Class",
        price: "650€",
    },
    {
        id: 3,
        from: "France",
        to: "Canada",
        image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=1000&auto=format&fit=crop",
        date: "Sep 19, 2025 - 25 Sep 2025",
        class: "Economy Class",
        price: "800€",
    },
];

export default function FlightsPage() {
    const t = useTranslations("Shop_Page");

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Top Navigation Bar - Reused from Shop */}
            {/* Top Navigation Bar - Reused from Shop */}
            <ShopHeaderNav>
                <div className="relative hidden sm:block sm:w-80 lg:w-96">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <Input
                        type="search"
                        placeholder={t("search.placeholder")}
                        className="h-12 rounded-full border-gray-300 bg-gray-50 pl-12 pr-4 focus:bg-white"
                    />
                </div>
            </ShopHeaderNav>

            <Container className="py-12 md:py-40 relative overflow-hidden">
                {/* Decorative background blur/gradient */}
                <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-br from-[#E0F7FA]/30 to-white/0 pointer-events-none -z-10 rounded-full blur-3xl opacity-60 translate-x-[-10%] translate-y-[-20%]" />

                <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
                    {/* Left Content */}
                    <div className="relative z-10 max-w-xl pt-10">
                        <h1 className="text-4xl md:text-5xl lg:text-[64px] font-bold text-[#0F172A] leading-[1.1] mb-6 tracking-tight">
                            Best Deals Are <br /> Waiting For You!
                        </h1>
                        <p className="text-gray-500 text-lg md:text-xl max-w-md leading-relaxed">
                            Explore 900+ international airlines in one place—no more site-hopping.
                        </p>

                        {/* Dotted Line Decoration */}
                        <svg className="absolute top-[100%] left-0 w-[140%] h-40 hidden lg:block pointer-events-none text-[#005C73]/40 z-0 translate-y-4" viewBox="0 0 400 100" preserveAspectRatio="none">
                            <path d="M0,80 C100,80 150,20 200,50 C250,80 300,80 400,20" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
                        </svg>
                    </div>

                    {/* Right Content - Airplane Image */}
                    <div className="relative z-10 flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-[800px] lg:scale-110 lg:translate-x-12">
                            <Image
                                src="/assets/shop/aeroplane.svg"
                                alt="Airplane"
                                width={800}
                                height={500}
                                className="w-full h-auto object-contain drop-shadow-2xl"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Search Widget */}
                <div className="relative z-20 max-w-5xl mx-auto -mt-20 lg:-mt-40">
                    {/* Tabs */}
                    <div className="flex items-center justify-center gap-4 mb-6 px-6">
                        <button className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900 group">
                            Business / First class
                            <ChevronDown className="h-3.5 w-3.5 text-gray-400 group-hover:text-gray-600 transition-colors" strokeWidth={2.5} />
                        </button>
                        <div className="w-px h-4 bg-gray-300" />
                        <button className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900 group">
                            <Users className="h-4 w-4 text-[#005C73]" />
                            01
                            <ChevronDown className="h-3.5 w-3.5 text-gray-400 group-hover:text-gray-600 transition-colors" strokeWidth={2.5} />
                        </button>
                    </div>

                    {/* Inputs Card with Gradient Border */}
                    <div className="rounded-[4rem] p-[2px] bg-gradient-to-r from-[#FF9E5E] to-[#005C73] shadow-[0_20px_60px_-10px_rgba(0,92,115,0.1)]">
                        <div className="bg-white rounded-[4rem] px-4 py-3 flex flex-col md:flex-row items-center gap-2">

                            {/* From */}
                            <div className="flex-1 w-full flex items-center gap-4 px-6 py-3 rounded-[3rem] hover:bg-gray-50 transition-colors cursor-pointer group">
                                <PlaneTakeoff className="h-7 w-7 text-[#005C73] stroke-[1.5]" />
                                <div className="flex flex-col">
                                    <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-0.5">From</span>
                                    <span className="text-gray-900 font-bold text-lg leading-tight">France</span>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="w-px h-10 bg-gray-200 hidden md:block" />
                            <div className="h-px w-full bg-gray-200 md:hidden" />

                            {/* To */}
                            <div className="flex-1 w-full flex items-center gap-4 px-6 py-3 rounded-[3rem] hover:bg-gray-50 transition-colors cursor-pointer group">
                                <PlaneLanding className="h-7 w-7 text-[#005C73] stroke-[1.5]" />
                                <div className="flex flex-col">
                                    <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-0.5">To</span>
                                    <span className="text-gray-900 font-bold text-lg leading-tight">Bénin</span>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="w-px h-10 bg-gray-200 hidden md:block" />
                            <div className="h-px w-full bg-gray-200 md:hidden" />

                            {/* Departure */}
                            <div className="flex-1 w-full flex items-center gap-4 px-6 py-3 rounded-[3rem] hover:bg-gray-50 transition-colors cursor-pointer group">
                                <Calendar className="h-7 w-7 text-[#005C73] stroke-[1.5]" />
                                <div className="flex flex-col">
                                    <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-0.5">Departure</span>
                                    <span className="text-gray-900 font-bold text-lg leading-tight">Sep 19, 2025</span>
                                </div>
                            </div>

                            {/* Search Button */}
                            <button className="h-14 w-14 ml-2 rounded-full bg-[#005C73] text-white flex items-center justify-center hover:bg-[#004a5c] shadow-lg shadow-[#005C73]/20 transition-all hover:scale-105 active:scale-95 shrink-0">
                                <Search className="h-6 w-6" strokeWidth={2.5} />
                            </button>

                        </div>
                    </div>
                </div>

                {/* Latest Flight Deals */}
                <div className="mt-32 md:mt-40">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Flight Deals</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {flightDeals.map((deal) => (
                            <div key={deal.id} className="bg-white rounded-[2rem] p-4 shadow-sm hover:shadow-xl transition-all duration-300 ring-1 ring-gray-100 group">
                                <div className="relative aspect-[1.6/1] rounded-[1.5rem] overflow-hidden mb-5">
                                    <Image
                                        src={deal.image}
                                        alt={`${deal.from} to ${deal.to}`}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                <div className="px-2 pb-2">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{deal.from} to {deal.to}</h3>
                                    <p className="text-sm text-gray-500 mb-6 font-medium">{deal.date}</p>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1 font-medium">{deal.class}</p>
                                            <p className="text-3xl font-bold text-gray-900 tracking-tight">{deal.price}</p>
                                        </div>
                                        <Button className="bg-[#005C73] hover:bg-[#004a5c] text-white rounded-xl px-8 h-12 font-semibold shadow-lg shadow-[#005C73]/20 transition-all hover:translate-y-[-2px]">
                                            Book Now
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </Container>
        </div>
    );
}
