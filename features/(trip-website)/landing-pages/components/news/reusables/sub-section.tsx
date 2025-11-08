import React, { ReactNode } from "react";
import { colors } from "@/features/(trip-website)/landing-pages/components/news/explore-recognition-guide";

export const Subsection = ({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) => (
  <div className={`mb-6 ${className}`}>
    <h3
      className="mb-3 text-xl font-semibold"
      style={{ color: colors.secondary }}
    >
      {title}
    </h3>
    {children}
  </div>
);
