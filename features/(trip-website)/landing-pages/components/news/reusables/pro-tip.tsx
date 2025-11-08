import React, { ReactNode } from "react";
import { colors } from "@/features/(trip-website)/landing-pages/components/news/explore-recognition-guide";

export const ProTip = ({ children }: { children: ReactNode }) => (
  <div
    className="my-6 border-l-8 p-6"
    style={{
      backgroundColor: colors.warningBg,
      borderLeftColor: colors.warning,
    }}
  >
    <p className="mb-2 font-semibold" style={{ color: colors.warning }}>
      Pro Tip:
    </p>
    <p className="leading-relaxed" style={{ color: colors.warningText }}>
      {children}
    </p>
  </div>
);
