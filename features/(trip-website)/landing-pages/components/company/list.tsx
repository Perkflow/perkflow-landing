import spherule from "@/assets/images/spherule.png";
import acmeCorp from "@/assets/images/acmeCorp.png";
import epicurious from "@/assets/images/epicurious.png";
import segment from "@/assets/images/segment.png";
import luminus from "@/assets/images/luminus.png";
import altShift from "@/assets/images/alt.png";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function List() {
  const t = useTranslations("Company_Page.List");
  const companies = [
    {
      id: 1,
      logo: spherule,
      title: "Spherule",
      content: t("companies.content"),
      link: "#",
    },
    {
      id: 2,
      logo: acmeCorp,
      title: "Acme Corp",
      content: t("companies.content"),
      link: "#",
    },
    {
      id: 3,
      logo: epicurious,
      title: "Epicurious",
      content: t("companies.content"),
      link: "#",
    },
    {
      id: 4,
      logo: segment,
      title: "Segment",
      content: t("companies.content"),
      link: "#",
    },
    {
      id: 5,
      logo: luminus,
      title: "Luminus",
      content: t("companies.content"),
      link: "#",
    },
    {
      id: 6,
      logo: altShift,
      title: "Alt + Shift",
      content: t("companies.content"),
      link: "#",
    },
    {
      id: 7,
      logo: luminus,
      title: "Luminus",
      content: t("companies.content"),
      link: "#",
    },
    {
      id: 8,
      logo: segment,
      title: "Segment",
      content: t("companies.content"),
      link: "#",
    },
    {
      id: 9,
      logo: altShift,
      title: "Alt + Shift",
      content: t("companies.content"),
      link: "#",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 px-4 py-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 lg:px-16">
      {companies.map(({ id, title, content, logo, link }) => (
        <div
          key={id}
          className="bg-card text-muted-foreground border-border overflow-hidden rounded-xl border shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <div className="flex flex-col gap-4 p-5 text-sm">
            <div className="flex items-center gap-3">
              <Image
                src={logo}
                alt={`${title} logo`}
                height={28}
                className="w-auto"
              />
              <h2 className="text-foreground text-base font-semibold">
                {title}
              </h2>
            </div>

            <p className="leading-relaxed">{content}</p>

            <Link
              href={link}
              className="text-primary flex items-center gap-1 hover:underline"
            >
              <span>{t("link_text")}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
