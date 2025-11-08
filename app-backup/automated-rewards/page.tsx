import RewardsHeroSection from "@/features/(trip-website)/automated-rewards/components/hero";
import RewardsAutopilot from "@/features/(trip-website)/automated-rewards/components/rewards-autopilot";
import MotivationSection from "@/features/(trip-website)/automated-rewards/components/motivation";
import Customize from "@/features/(trip-website)/automated-rewards/components/customize";
import Impact from "@/features/(trip-website)/automated-rewards/components/impact";
import FAQ from "@/features/(trip-website)/components/faq";

export default function Page() {
  return (
    <div className="mx-auto min-h-screen">
      <RewardsHeroSection />
      <MotivationSection />
      <RewardsAutopilot />
      <Customize />
      <Impact />
      <FAQ />
    </div>
  );
}
