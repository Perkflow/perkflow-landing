import React, { ReactNode } from "react";
import { colors } from "./colors";

type AlertType = "info" | "warning" | "error" | "success";

export const PolicyInfoBox = ({
  type = "info",
  title,
  children,
  className = "",
}: {
  className?: string;
  type?: string;
  title?: string;
  children: ReactNode;
}) => {
  const typeStyles: Record<AlertType, { bg: string; border: string; text: string }> = {
    info: { bg: colors.lightBg, border: colors.primary, text: colors.primary },
    warning: { bg: colors.warningBg, border: colors.orange, text: colors.orange },
    error: { bg: colors.errorBg, border: colors.red, text: colors.red },
    success: { bg: colors.successBg, border: colors.green, text: colors.green },
  };

  const style = typeStyles[type as AlertType];

  return (
    <div className={`rounded-lg border-l-4 p-4 ${className}`} style={{ backgroundColor: style.bg, borderLeftColor: style.border }}>
      {title && (
        <h4 className="mb-2 font-semibold" style={{ color: style.text }}>
          {title}
        </h4>
      )}
      <div style={{ color: colors.secondary }}>{children}</div>
    </div>
  );
};

export default PolicyInfoBox;
