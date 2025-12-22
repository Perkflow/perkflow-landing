"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import {
    Search,
    Calendar,
    MapPin,
    Users,
    Star,
} from "lucide-react";
import Container from "@/components/layouts/container";
import { Button } from "@/components/ui/button";

const hotelDeals = [
    {
        id: 1,
        name: "Rixos The Palm Hotel & Suites",
        location: "Dubai, UAE",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000&auto=format&fit=crop",
        rating: 4.8,
        price: "250€",
        per: "night",
    },
    {
        id: 2,
        name: "Shangri-La Paris",
        location: "Paris, France",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop",
        rating: 4.9,
        price: "450€",
        per: "night",
    },
    {
        id: 3,
        name: "Marina Bay Sands",
        location: "Singapore",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1000&auto=format&fit=crop",
        rating: 4.7,
        price: "380€",
        per: "night",
    },
];

export default function HotelsContent() {
    const t = useTranslations("Shop_Page");

    return (
        <>
            {/* Full Width Hero Section */}
            <div className="relative h-[600px] w-full">
                <Image
                    src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2000&auto=format&fit=crop"
                    alt="Luxury Hotel Hero"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />

                <Container className="relative z-10 h-full flex flex-col items-center justify-center text-center pt-20">
                    <h1 className="text-4xl md:text-5xl lg:text-[64px] font-bold text-white leading-[1.1] mb-6 tracking-tight drop-shadow-lg">
                        Find Your Perfect <br /> Place To Stay
                    </h1>
                    <p className="text-white/90 text-lg md:text-xl max-w-xl leading-relaxed drop-shadow-md mb-12">
                        Discover top-rated hotels, resorts, and vacation rentals around the world.
                    </p>

                    {/* Search Widget */}
                    <div className="w-full max-w-5xl">
                        <div className="rounded-[4rem] p-[2px] bg-linear-to-r from-[#FF9E5E] to-[#005C73] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)]">
                            <div className="bg-white rounded-[4rem] px-4 py-3 flex flex-col md:flex-row items-center gap-2">
                                {/* Location */}
                                <div className="flex-1 w-full flex items-center gap-4 px-6 py-3 rounded-[3rem] hover:bg-gray-50 transition-colors cursor-pointer group text-left">
                                    <MapPin className="h-7 w-7 text-[#005C73] stroke-[1.5]" />
                                    <div className="flex flex-col">
                                        <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-0.5">Location</span>
                                        <span className="text-gray-900 font-bold text-lg leading-tight">Dubai</span>
                                    </div>
                                </div>

                                <div className="w-px h-10 bg-gray-200 hidden md:block" />
                                <div className="h-px w-full bg-gray-200 md:hidden" />

                                {/* Dates */}
                                <div className="flex-1 w-full flex items-center gap-4 px-6 py-3 rounded-[3rem] hover:bg-gray-50 transition-colors cursor-pointer group text-left">
                                    <Calendar className="h-7 w-7 text-[#005C73] stroke-[1.5]" />
                                    <div className="flex flex-col">
                                        <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-0.5">Check-in — Check-out</span>
                                        <span className="text-gray-900 font-bold text-lg leading-tight">19 Sep - 25 Sep</span>
                                    </div>
                                </div>

                                <div className="w-px h-10 bg-gray-200 hidden md:block" />
                                <div className="h-px w-full bg-gray-200 md:hidden" />

                                {/* Guests */}
                                <div className="flex-1 w-full flex items-center gap-4 px-6 py-3 rounded-[3rem] hover:bg-gray-50 transition-colors cursor-pointer group text-left">
                                    <Users className="h-7 w-7 text-[#005C73] stroke-[1.5]" />
                                    <div className="flex flex-col">
                                        <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-0.5">Guests</span>
                                        <span className="text-gray-900 font-bold text-lg leading-tight">2 Adults, 1 Room</span>
                                    </div>
                                </div>

                                {/* Search Button */}
                                <button className="h-14 w-14 ml-2 rounded-full bg-[#005C73] text-white flex items-center justify-center hover:bg-[#004a5c] shadow-lg shadow-[#005C73]/20 transition-all hover:scale-105 active:scale-95 shrink-0">
                                    <Search className="h-6 w-6" strokeWidth={2.5} />
                                </button>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            <Container className="py-12 md:py-20 relative overflow-hidden">
                {/* Popular Hotels Section */}
                <div className="mt-32 md:mt-40">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Popular Destinations</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {hotelDeals.map((deal) => (
                            <div key={deal.id} className="bg-white rounded-4xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 ring-1 ring-gray-100 group">
                                <div className="relative aspect-[1.4/1] rounded-3xl overflow-hidden mb-5">
                                    <Image
                                        src={deal.image}
                                        alt={deal.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                        <span className="text-xs font-bold text-gray-900">{deal.rating}</span>
                                    </div>
                                </div>
                                <div className="px-2 pb-2">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1">{deal.name}</h3>
                                            <div className="flex items-center gap-1 text-gray-500 text-sm">
                                                <MapPin className="h-3.5 w-3.5" />
                                                {deal.location}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-400 font-medium">Start from</p>
                                            <div className="flex items-baseline gap-1">
                                                <p className="text-2xl font-bold text-[#005C73]">{deal.price}</p>
                                                <span className="text-sm text-gray-500">/{deal.per}</span>
                                            </div>
                                        </div>
                                        <Button className="bg-[#005C73]/10 hover:bg-[#005C73] text-[#005C73] hover:text-white rounded-xl px-6 h-11 font-semibold transition-all">
                                            View Details
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </>
    );
}
