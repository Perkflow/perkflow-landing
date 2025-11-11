import WhyUsFront from "@/features/(trip-website)/landing-pages/components/why-us/why-us";
import AboutUs from "@/features/(trip-website)/landing-pages/components/why-us/about-us";
import OurPhilosophy from "@/features/(trip-website)/landing-pages/components/why-us/our-philosophy";
import OurValues from "@/features/(trip-website)/landing-pages/components/why-us/our-values";
import OurTeam from "@/features/(trip-website)/landing-pages/components/why-us/our-team";
import LeadingCompanies from "@/features/(trip-website)/landing-pages/components/why-us/leading-companies";
import { Metadata } from "next";

export const metadata: Metadata = {
  description:
    "Why choose PerkFlow? Because personalized recognition drives real results. Discover how we help companies build happier, high-performing teams.",
};

export default function WhyUs() {
  return (
    <>
      <WhyUsFront />
      <AboutUs />
      <div className="relative overflow-hidden">
        {/* Gradient background overlays */}
        {/* Softer, smaller blobs */}
        <div className="absolute top-50 -right-20 z-0 h-[500px] w-[30%] rounded-full bg-linear-to-br from-orange-200/40 to-green-200/12 blur-[90px]" />
        <div className="absolute top-1/2 -left-20 z-0 h-[500px] w-[30%] rounded-full bg-linear-to-br from-green-200/40 to-blue-200/12 blur-[90px]" />
        <div className="absolute -right-20 bottom-50 z-0 h-[500px] w-[30%] rounded-full bg-linear-to-br from-green-200/40 to-blue-200/12 blur-[90px]" />
        <OurPhilosophy />
        <OurValues />
        <OurTeam />
        <LeadingCompanies />
      </div>
    </>
  );
}
