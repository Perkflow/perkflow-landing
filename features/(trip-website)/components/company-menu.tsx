"use client";

import { cn } from "@/lib/utils";

import { Link } from "@/i18n/navigation";

import AnimatedBackground from "@/components/atoms/animated-background";

import { useTranslations } from "next-intl";

const getITEMS = (t: (key: string) => string) => [
  {
    title: t("companyMegaMenu.item1.title"),
    desc: t("companyMegaMenu.item1.description"),
    href: "/why-us",
  },
  {
    title: t("companyMegaMenu.item2.title"),
    desc: t("companyMegaMenu.item2.description"),
    href: "/careers",
  },
  {
    title: t("companyMegaMenu.item3.title"),
    desc: t("companyMegaMenu.item3.description"),
    href: "/trips",
  },
  {
    title: t("companyMegaMenu.item4.title"),
    desc: t("companyMegaMenu.item4.description"),
    href: "/award-ceremony",
  },
];

export default function CompanyMegaMenu({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const t = useTranslations("Header");
  const ITEMS = getITEMS(t);

  return (
    <div
      className={cn(
        "absolute inset-x-0 top-[48px] z-10 w-full transform overflow-hidden bg-transparent pt-4 transition-all duration-500 ease-in-out",
        open
          ? "pointer-events-auto max-h-screen translate-y-0"
          : "pointer-events-none max-h-0 -translate-y-0",
      )}
    >
      <div className="mx-auto grid h-[250px] w-full max-w-7xl overflow-hidden rounded-b-2xl bg-white px-4 sm:px-6 lg:px-9">
        <div className="col-span-8 bg-white p-8 transition-colors duration-300">
          <div className="mx-auto flex max-w-[90rem] gap-x-8">
            <div className="grid grid-cols-4 gap-x-4 gap-y-8">
              <AnimatedBackground
                className={`rounded-lg bg-[#F98A26]/20`}
                transition={{
                  type: "spring",
                  bounce: 0.2,
                  duration: 0.6,
                }}
                enableHover
              >
                {ITEMS.slice(0).map(({ title, desc, href }, index) => {
                  const handleClick = () => {
                    setOpen(false);

                    return;
                  };
                  return (
                    <Link
                      onClick={handleClick}
                      href={href}
                      key={index}
                      data-id={`card-${index}`}
                      className="flex w-[80%] flex-col items-start space-x-3 rounded-md p-4 transition"
                    >
                      <div className="mb-1 flex items-center space-x-3">
                        <h4 className="font-semibold text-[#101828]">
                          {title}
                        </h4>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{desc}</p>
                      </div>
                    </Link>
                  );
                })}
              </AnimatedBackground>
            </div>

            <div className="flex flex-1 flex-col"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
