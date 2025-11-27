import React from "react";
import { Clock } from "lucide-react";
import { colors } from "./colors";

export const PolicyHeader = ({
  title,
  updated = "November 27, 2025",
  readTime = "10 min read",
}: {
  title: string;
  updated?: string;
  readTime?: string;
}) => {
  return (
    <div className="mb-8 text-center">
      <h1 className="mb-4 text-3xl font-bold" style={{ color: colors.primary }}>
        {title}
      </h1>
      <p className="mb-4 text-lg" style={{ color: colors.secondary }}>
        Please read this document carefully.
      </p>
      <div
        className="flex items-center justify-center gap-6 text-sm"
        style={{ color: colors.muted }}
      >
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Last updated: {updated}
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          {readTime}
        </div>
      </div>
    </div>
  );
};

export default PolicyHeader;
