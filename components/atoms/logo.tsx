import { cn } from "@/lib/utils";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

import logo from "@/assets/icons/logo.svg";

interface Props {
  width?: number;
  height?: number;
  className?: string;
}

// components/Logo.tsx
export default function Logo({ width, height }: Props) {
  return (
    <Link href="/" className="flex-shrink-0">
      <Image
        alt="logo"
        src={logo}
        width={width ?? 160}
        height={height ?? 0}
        className={cn("h-fit w-[120px] flex-none object-cover md:w-[150px]")}
      />
    </Link>
  );
}
