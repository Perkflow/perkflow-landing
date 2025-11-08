"use client";
import Image from "next/image";
import Team1 from "@/assets/images/team-1.jpg";
import Team2 from "@/assets/images/team-2.jpg";
import Team3 from "@/assets/images/team-3.jpg";
import Team4 from "@/assets/images/team-4.jpg";
import { useTranslations } from "next-intl";

export default function Team() {
  const t = useTranslations("Careers_Page");
  const teamMembers = [
    { name: "Leo Geidt", role: t("Team.member1.role"), image: Team1 },
    { name: "Maya Brooks", role: t("Team.member2.role"), image: Team2 },
    { name: "James Park", role: t("Team.member3.role"), image: Team3 },
    { name: "Sophie Lee", role: t("Team.member4.role"), image: Team4 },
    { name: "Leo Geidt", role: t("Team.member1.role"), image: Team1 },
    { name: "Maya Brooks", role: t("Team.member2.role"), image: Team2 },
    { name: "James Park", role: t("Team.member3.role"), image: Team3 },
    { name: "Sophie Lee", role: t("Team.member4.role"), image: Team4 },
  ];

  return (
    <div className="overflow-hidden bg-white px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">{t("Team.heading")}</h1>

      <div className="relative w-full overflow-hidden">
        <div className="animate-scroll hover:paused flex w-max">
          {teamMembers.map(({ name, role, image }, index) => (
            <div
              key={index}
              className="relative mx-2 h-80 min-w-[240px] shrink-0 overflow-hidden rounded sm:min-w-[260px] md:min-w-[280px]"
            >
              <Image
                src={image}
                alt={`${name} photo`}
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-b from-(--chart-8)/10 via-(--chart-7)/20 to-(--chart-8) opacity-90" />

              <div className="absolute bottom-4 left-4 z-20 text-white">
                <h3 className="text-base font-semibold">{name}</h3>
                <p className="text-sm">{role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 20s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
