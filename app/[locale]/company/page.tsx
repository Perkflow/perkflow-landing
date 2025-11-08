import Company from "@/features/(trip-website)/landing-pages/components/company/company";
import Join from "@/features/(trip-website)/landing-pages/components/company/join";
import List from "@/features/(trip-website)/landing-pages/components/company/list";

export default function CompanyPage() {
  return (
    <div className="bg-[#eef0f3]">
      <Company />
      <List />
      <Join />
    </div>
  );
}
