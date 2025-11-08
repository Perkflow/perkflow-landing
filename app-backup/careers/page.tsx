import Benefit from "@/features/(trip-website)/landing-pages/components/careers/benefit";
import Careers from "@/features/(trip-website)/landing-pages/components/careers/careers";
import Roles from "@/features/(trip-website)/landing-pages/components/careers/roles";
// import Team from "@/features/(trip-website)/landing-pages/components/careers/team";
import Values from "@/features/(trip-website)/landing-pages/components/careers/values";

export default function CareersPage() {
  return (
    <>
      <Careers />
      <Values />
      <Benefit />
      {/* <Team /> */}
      <Roles />
    </>
  );
}
