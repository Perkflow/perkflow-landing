"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import {
    Search,
    Gift,
    Plane,
    Sparkles,
    Building2,
    Smartphone,
    Phone,
    Globe,
    CreditCard,
    Zap,
    CheckCircle2,
} from "lucide-react";
import Container from "@/components/layouts/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { topNavCategories } from "@/features/(trip-website)/shop/data/products";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShopHeaderNav } from "@/features/(trip-website)/components/shop-header-nav";

const iconMap = {
    Gift,
    Plane,
    Sparkles,
    Building2,
    Gadget: Smartphone,
    Phone,
    Smartphone,
};

// Mock Data for Reloadly Simulation
const popularCountries = [
    { code: "US", name: "United States", flag: "🇺🇸", prefix: "+1" },
    { code: "FR", name: "France", flag: "🇫🇷", prefix: "+33" },
    { code: "NG", name: "Nigeria", flag: "🇳🇬", prefix: "+234" },
    { code: "IN", name: "India", flag: "🇮🇳", prefix: "+91" },
    { code: "GB", name: "United Kingdom", flag: "🇬🇧", prefix: "+44" },
];

const popularOperators = [
    { id: 1, name: "Orange", logo: "/logos/orange.png", color: "#FF7900" },
    { id: 2, name: "Vodafone", logo: "/logos/vodafone.png", color: "#E60000" },
    { id: 3, name: "MTN", logo: "/logos/mtn.png", color: "#FFCC00" },
    { id: 4, name: "Airtel", logo: "/logos/airtel.png", color: "#FF0000" },
    { id: 5, name: "T-Mobile", logo: "/logos/t-mobile.png", color: "#E20074" },
];

export default function MobileTopupPage() {
    const t = useTranslations("Shop_Page");
    const [selectedCountry, setSelectedCountry] = useState(popularCountries[0]);
    const [phoneNumber, setPhoneNumber] = useState("");

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Top Navigation Bar */}
            <ShopHeaderNav />

            {/* Hero Section */}
            <div className="relative bg-[#005C73] overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                    </svg>
                </div>

                <Container className="relative py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-white space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            Instant Mobile Top-up <br />
                            <span className="text-[#FF9E5E]">Worldwide</span>
                        </h1>
                        <p className="text-lg text-white/80 max-w-xl">
                            Send credit to over 160 countries and 550+ operators instantly.
                            Secure, fast, and reliable recharges for you and your loved ones.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <div className="flex items-center gap-2 text-white/90">
                                <Zap className="h-5 w-5 text-[#FF9E5E]" />
                                <span>Instant Delivery</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/90">
                                <Globe className="h-5 w-5 text-[#FF9E5E]" />
                                <span>160+ Countries</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/90">
                                <CheckCircle2 className="h-5 w-5 text-[#FF9E5E]" />
                                <span>Secure Payment</span>
                            </div>
                        </div>
                    </div>

                    {/* Recharge Widget */}
                    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl max-w-md w-full mx-auto lg:ml-auto">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Start a Recharge</h2>

                        <div className="space-y-4">
                            {/* Country Selector */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Country</label>
                                <Select
                                    defaultValue={popularCountries[0].code}
                                    onValueChange={(val) => setSelectedCountry(popularCountries.find(c => c.code === val) || popularCountries[0])}
                                >
                                    <SelectTrigger className="h-12 w-full rounded-xl border-gray-200 bg-gray-50 focus:ring-[#005C73] focus:border-[#005C73]">
                                        <SelectValue placeholder="Select Country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {popularCountries.map((country) => (
                                            <SelectItem key={country.code} value={country.code}>
                                                <span className="mr-2">{country.flag}</span>
                                                {country.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Phone Input */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone Number</label>
                                <div className="flex gap-3">
                                    <div className="h-12 w-20 flex items-center justify-center rounded-xl bg-gray-100 border border-gray-200 text-gray-600 font-medium">
                                        {selectedCountry.prefix}
                                    </div>
                                    <Input
                                        type="tel"
                                        placeholder="123 456 7890"
                                        className="h-12 rounded-xl border-gray-200 bg-gray-50 focus:ring-[#005C73] focus:border-[#005C73] flex-1"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>
                            </div>

                            <Button className="w-full h-12 rounded-xl bg-[#005C73] hover:bg-[#004a5c] text-white font-semibold text-lg hover:shadow-lg transition-all mt-4">
                                Continue
                            </Button>

                            <p className="text-center text-xs text-gray-400 mt-4">
                                By continuing, you agree to our Terms of Service.
                            </p>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Supported Operators Section */}
            <Container className="py-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Supported Operators</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        We support all major mobile operators worldwide.
                        Top up credit, data, and bundles instantly.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="flex items-center gap-2 font-bold text-2xl text-gray-800">
                        <div className="w-12 h-12 rounded-full bg-[#FF7900] flex items-center justify-center text-white text-xs">OR</div>
                        Orange
                    </div>
                    <div className="flex items-center gap-2 font-bold text-2xl text-gray-800">
                        <div className="w-12 h-12 rounded-full bg-[#E60000] flex items-center justify-center text-white text-xs">VF</div>
                        Vodafone
                    </div>
                    <div className="flex items-center gap-2 font-bold text-2xl text-gray-800">
                        <div className="w-12 h-12 rounded-full bg-[#FFCC00] flex items-center justify-center text-black text-xs">MTN</div>
                        MTN
                    </div>
                    <div className="flex items-center gap-2 font-bold text-2xl text-gray-800">
                        <div className="w-12 h-12 rounded-full bg-[#E20074] flex items-center justify-center text-white text-xs">TM</div>
                        T-Mobile
                    </div>
                </div>
            </Container>

            {/* How it Works */}
            <div className="bg-white py-20">
                <Container>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
                        <p className="text-gray-500">Simple and fast process to send airtime.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 rounded-2xl bg-[#E0F7FA] text-[#005C73] flex items-center justify-center mx-auto mb-6">
                                <Globe className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">1. Select Country</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Choose the destination country where you want to send the mobile credit.
                            </p>
                        </div>
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 rounded-2xl bg-[#E0F7FA] text-[#005C73] flex items-center justify-center mx-auto mb-6">
                                <Phone className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">2. Enter Number</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Enter the recipient's phone number. We'll automatically identify the operator.
                            </p>
                        </div>
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 rounded-2xl bg-[#E0F7FA] text-[#005C73] flex items-center justify-center mx-auto mb-6">
                                <CreditCard className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">3. Pay & Send</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Choose the amount and pay. The recharge is sent instantly to the phone.
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}
