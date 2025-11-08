"use client";

import airplaneIcon from "@/assets/icons/airplane.svg";
import giftIcon from "@/assets/icons/gift.svg";
import starIcon from "@/assets/icons/star.svg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { NavItem } from "./navitem";
import Image from "next/image";

const FEATURES = [
  {
    name: "Automated Rewards",
    href: "/rewards",
    icon: starIcon,
    content:
      "for your every employee, an automated incentive journey to awaken the winner in everyone of them.",
  },
  {
    name: "Gifts",
    href: "/trips",
    icon: giftIcon,
    content:
      "We curate rewards for your team based on goal completion for your company.",
  },
  {
    name: "Trips",
    href: "/trips",
    icon: airplaneIcon,
    content:
      "Set up milestone-based team or solo trips as high-impact rewards for top performers",
  },
];

export default function FeatureDropdown({ mobile = false }) {
  const [open, setOpen] = useState(false);
  const buttonBase = "flex items-center";
  const buttonClasses = mobile
    ? null
    : cn(
        buttonBase,
        "inline-flex",
        "text-gray-700 hover:text-gray-900",
        "focus:outline-none",
      );

  const dropdownClasses = cn(
    "absolute pl-4 space-y-4 w-48 bg-white shadow-lg border rounded-[12px] p-3 w-[350px] overflow-hidden",
    open
      ? "dropdown-enter pointer-events-auto"
      : "dropdown-leave pointer-events-none",
  );

  return (
    <div
      className={cn(!mobile && "relative group")}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Button
        variant="ghost"
        className={cn(
          "text-black text-sm font-medium hover:text-gray-900 transform cursor-pointer",
          buttonClasses,
        )}
      >
        Features
        <ChevronDown className="size-4" />
      </Button>

      {/* Keyframes and animation classes */}
      <style jsx global>{`
        @keyframes dropdownEnter {
          0% {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes dropdownLeave {
          0% {
            opacity: 1;
            transform: translateY(0) scale(9);
          }

          100% {
            opacity: 0;
            transform: translateY(-10px) scale(0.5);
          }
        }
        .dropdown-enter {
          animation: dropdownEnter 200ms ease-out forwards;
        }
        .dropdown-leave {
          animation: dropdownLeave 300ms ease-in forwards;
        }
      `}</style>

      {open && (
        <div
          className={
            mobile
              ? cn(
                  "bg-white overflow-hidden transition-all duration-700 ease-out transform",
                  open
                    ? "opacity-100 scale-100 max-h-screen"
                    : "opacity-0 scale-95 max-h-0",
                )
              : dropdownClasses
          }
        >
          {FEATURES.map(({ name, href, icon, content }) => (
            <NavItem
              key={name}
              href={href}
              onClick={mobile ? () => {} : undefined}
              className={cn("flex gap-4 px-4 py-2  ")}
            >
              <Image
                src={icon}
                alt={name}
                width={20}
                height={20}
                className="w-6 h-6"
              />
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-[#101828]">{name}</p>
                <p className="text-xs text-gray-500">{content}</p>
              </div>
            </NavItem>
          ))}
        </div>
      )}
    </div>
  );
}
