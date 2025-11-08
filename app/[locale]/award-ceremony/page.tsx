import Accomplishment from "@/features/(trip-website)/landing-pages/components/awards/accomplishment";
import Awards from "@/features/(trip-website)/landing-pages/components/awards/awards";
import Celebrate from "@/features/(trip-website)/landing-pages/components/awards/celebrate";
import Milestone from "@/features/(trip-website)/landing-pages/components/awards/milestone";
import Recognition from "@/features/(trip-website)/landing-pages/components/awards/recognition";

export default function AwardsPage() {
  return (
    <>
      <Awards />
      <Recognition />
      <Celebrate />
      <Milestone />
      <Accomplishment />
    </>
  );
}
