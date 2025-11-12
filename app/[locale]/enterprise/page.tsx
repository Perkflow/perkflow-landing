"use client";

import Enterprise from "@/features/(trip-website)/landing-pages/components/enterprise/enterprise";
import Features from "@/features/(trip-website)/landing-pages/components/enterprise/features";
import Incentives from "@/features/(trip-website)/landing-pages/components/enterprise/incentives";
import Objectives from "@/features/(trip-website)/landing-pages/components/enterprise/objectives";
import Purpose from "@/features/(trip-website)/landing-pages/components/enterprise/purpose";
import Results from "@/features/(trip-website)/landing-pages/components/enterprise/results";
import Story from "@/features/(trip-website)/landing-pages/components/enterprise/story";
import Partners from "@/features/(trip-website)/landing-pages/components/partners";

export default function EnterprisePage() {
  return (
    <>
      <Enterprise />
      <div className="max-w-7xl mx-auto">
        <Partners />
        <Incentives />
      </div>
      <Purpose />
      <Objectives />
      <Features />
      <Story />
      <Results />
    </>
  );
}
