import React, { ReactNode } from "react";
import { colors } from "@/features/(trip-website)/landing-pages/components/terms/terms-and-conditions";

export const SectionHeader = ({
  children,
  id,
}: {
  children: ReactNode;
  id?: string;
}) => (
  <h3
    id={id}
    className="mb-4 flex items-center text-xl font-semibold"
    style={{ color: colors.primary }}
  >
    <div
      className="mr-3 h-2 w-2 rounded-full"
      style={{ backgroundColor: colors.primary }}
    />
    {children}
  </h3>
);
