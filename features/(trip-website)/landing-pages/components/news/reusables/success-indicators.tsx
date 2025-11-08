import React from "react";
import { colors } from "@/features/(trip-website)/landing-pages/components/news/explore-recognition-guide";

export const SuccessIndicators = ({ indicators }: { indicators: string[] }) => (
  <div>
    <h3
      className="mb-4 text-xl font-semibold"
      style={{ color: colors.secondary }}
    >
      Success Indicators
    </h3>
    <div className="space-y-3">
      {indicators.map((indicator, index) => (
        <div key={index} className="flex items-start gap-3">
          <div
            className="mt-2 h-2 w-2 flex-shrink-0 rounded-full"
            style={{ backgroundColor: colors.secondary }}
          />
          <span className="leading-relaxed text-gray-700">{indicator}</span>
        </div>
      ))}
    </div>
  </div>
);
