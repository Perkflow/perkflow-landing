import { cn } from "@/lib/utils";
import React from "react";

export default function AuthPageContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <section className={cn("mx-auto", className)}>{children}</section>;
}
