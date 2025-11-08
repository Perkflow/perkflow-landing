import React, { ReactNode } from "react";
import { colors } from "@/features/(trip-website)/landing-pages/components/news/explore-recognition-guide";

export const SectionComp = ({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) => (
  <div className={`rounded-lg bg-white shadow-sm ${className}`}>
    <h2 className="mb-6 text-2xl font-bold" style={{ color: colors.secondary }}>
      {title}
    </h2>
    {children}
  </div>
);
