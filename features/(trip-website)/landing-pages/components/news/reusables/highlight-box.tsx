import React, { ReactNode } from "react";
import { colors } from "@/features/(trip-website)/landing-pages/components/news/explore-recognition-guide";

export const HighlightBox = ({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={`rounded-lg p-6 ${className}`}
    style={{ backgroundColor: colors.surface }}
  >
    <h3
      className="mb-4 text-xl font-semibold"
      style={{ color: colors.secondary }}
    >
      {title}
    </h3>
    {children}
  </div>
);
