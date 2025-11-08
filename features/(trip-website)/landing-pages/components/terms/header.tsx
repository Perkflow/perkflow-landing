import { Clock } from "lucide-react";
import React from "react";
import { colors } from "@/features/(trip-website)/landing-pages/components/terms/terms-and-conditions";

export const TermsHeader = () => {
  return (
    <div className="mb-8 text-center">
      <h1 className="mb-4 text-3xl font-bold" style={{ color: colors.primary }}>
        Terms and Conditions
      </h1>
      <p className="mb-4 text-lg" style={{ color: colors.secondary }}>
        Please read these terms carefully before using our services
      </p>
      <div
        className="flex items-center justify-center gap-6 text-sm"
        style={{ color: colors.muted }}
      >
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Last updated: January 15, 2024
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          15 min read
        </div>
      </div>
    </div>
  );
};
