import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { ReactNode } from "react";

interface NavItemProps {
  href: string;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function NavItem({
  href,
  children,
  onClick,
  className = "",
}: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "font-medium text-black hover:text-gray-900 md:text-sm",
        className,
      )}
    >
      {children}
    </Link>
  );
}
