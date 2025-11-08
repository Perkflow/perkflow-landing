import FAQ from "@/features/(trip-website)/components/faq";
import GiftHeroSection from "@/features/(trip-website)/gifts/components/gift-hero";
import MakeGiftingSection from "@/features/(trip-website)/gifts/components/make-gifting";
import RecognizeAchievementsSection from "@/features/(trip-website)/gifts/components/recognize-achievement";
import WhyGiftsWorkSection from "@/features/(trip-website)/gifts/components/why-gifts-work";

export default function Page() {
  return (
    <div className="mx-auto min-h-screen">
      <GiftHeroSection />
      <WhyGiftsWorkSection />
      <MakeGiftingSection />
      <RecognizeAchievementsSection />
      <FAQ />
    </div>
  );
}
