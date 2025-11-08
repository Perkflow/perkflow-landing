import RecentArticles from "@/features/(trip-website)/landing-pages/components/resources/recent-articles";
import Recongnition from "@/features/(trip-website)/landing-pages/components/resources/reconginition";
import Resources from "@/features/(trip-website)/landing-pages/components/resources/resources";

export const revalidate = 300; // ISR: cache this page for 5 minutes

export default async function ResourcesPage() {
  return (
    <div>
      <Resources />
      <Recongnition />
      <RecentArticles />
    </div>
  );
}
