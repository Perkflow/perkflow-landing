import { CheckCircle } from "lucide-react";
import React, { ReactNode } from "react";
import { colors } from "@/features/(trip-website)/landing-pages/components/news/explore-recognition-guide";

export const ListItem = ({
  children,
  icon = true,
}: {
  children: ReactNode;
  icon?: boolean;
}) => (
  <div className="mb-3 flex items-start gap-3">
    {icon && (
      <CheckCircle
        className="mt-0.5 h-5 w-5 flex-shrink-0"
        style={{ color: colors.accent }}
      />
    )}
    <span className="leading-relaxed text-gray-700">{children}</span>
  </div>
);
