import React, { ReactNode } from "react";
import { colors } from "@/features/(trip-website)/landing-pages/components/news/explore-recognition-guide";

export const QuoteComp = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  const lightBackground = `${colors.primary}15`;

  return (
    <div
      className={`relative py-4 pl-6 text-center ${className}`}
      style={{ backgroundColor: lightBackground }}
    >
      <div
        className="absolute top-0 left-0 h-full w-2 rounded"
        style={{ backgroundColor: colors.primary }}
      />
      <p
        className="p-4 text-lg leading-relaxed font-medium italic"
        style={{ color: colors.primary }}
      >
        {children}
      </p>
    </div>
  );
};
