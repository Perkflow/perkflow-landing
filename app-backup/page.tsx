import Benefits from "@/features/(trip-website)/landing-pages/components/benefits";
import FullControl from "@/features/(trip-website)/landing-pages/components/full-control";
import HeroSection from "@/features/(trip-website)/landing-pages/components/hero";
import HowItWorks from "@/features/(trip-website)/landing-pages/components/how-it-works";
import Partners from "@/features/(trip-website)/landing-pages/components/partners";
import Planning from "@/features/(trip-website)/landing-pages/components/planning";
import Service from "@/features/(trip-website)/landing-pages/components/service";
import Support from "@/features/(trip-website)/landing-pages/components/support";
import Testimonials from "@/features/(trip-website)/landing-pages/components/testimonials";

export default function Home() {
  return (
    <div className="mx-auto min-h-screen">
      <HeroSection />
      <Partners />
      <Service />
      <Benefits />
      <Support />
      <Testimonials />
      <Planning />
    </div>
  );
}
