import FAQ from "@/features/(trip-website)/components/faq";
import CareerPath from "@/features/(trip-website)/trips/components/career-path";
import DreamSection from "@/features/(trip-website)/trips/components/dream";
import TripsHeroSection from "@/features/(trip-website)/trips/components/hero";
import Testimonials from "@/features/(trip-website)/trips/components/testimonials";
import TransformSection from "@/features/(trip-website)/trips/components/transform-section";

export default function Page() {
  return (
    <div className="mx-auto min-h-screen overflow-hidden">
      <TripsHeroSection />
      <TransformSection />
      <CareerPath />
      <DreamSection />
      <Testimonials />
      <FAQ />
    </div>
  );
}
