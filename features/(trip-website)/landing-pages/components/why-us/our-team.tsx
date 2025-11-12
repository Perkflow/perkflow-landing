import { useTranslations } from "next-intl";
import abigailImage from "@/assets/images/team/abigail.svg";
import abrahamImage from "@/assets/images/team/abraham.svg";
import vincentImage from "@/assets/images/team/vincent.svg";
import claraImage from "@/assets/images/team/clara_abbey.svg";
import francisImage from "@/assets/images/team/francis_ufam.svg";
import ousmaneImage from "@/assets/images/team/ousmane_diop.svg";
import steveImage from "@/assets/images/team/steven.svg";
import linkedinIcon from "@/assets/icons/linkedin-linear-icon.svg";
import Image from "next/image";
import Link from "next/link";

export default function OurTeam() {
  const t = useTranslations("Why_Us_Page");

  const members = [
    {
      id: 1,
      name: "Steve Mbenoun",
      role: "CEO & FOUNDER",
      linkedin: "https://www.linkedin.com/in/steve-mbenoun/",
      image: steveImage,
      objectPosition: "center",
    },
    {
      id: 2,
      name: "Abraham Tanta",
      role: "CTO",
      linkedin: "https://www.linkedin.com/in/mr-tanta/",
      image: abrahamImage,
      objectPosition: "center",
    },
    {
      id: 3,
      name: "Abigail Yakam",
      role: "HR Relations",
      linkedin:
        "https://www.linkedin.com/in/abiguail-yakam-she-her-elle-mba-90a227143/",
      image: abigailImage,
      objectPosition: "top",
    },
    {
      id: 4,
      name: "Precious Vincent",
      role: "Engineering",
      linkedin: "https://www.linkedin.com/in/precious-vincent-327abb1a3/",
      image: vincentImage,
      objectPosition: "center",
    },
    {
      id: 5,
      name: "Clara Abbey",
      role: "SALES MANAGER NIGERIA",
      linkedin: "https://www.linkedin.com/in/clara-abbey-7291961b0/",
      image: claraImage,
      objectPosition: "center",
    },
    {
      id: 6,
      name: "Francis Ufan-Abasi",
      role: "Communication",
      linkedin: "https://www.linkedin.com/in/ufan-abasi-francis-9604bb30a/",
      image: francisImage,
      objectPosition: "center",
    },
    {
      id: 7,
      name: "Ousmane Diop",
      role: "Partnerships Senegal",
      linkedin: "",
      image: ousmaneImage,
      objectPosition: "top",
    },
  ];

  return (
    <div className="z-10 flex flex-col items-center gap-8 bg-white px-4 py-10 md:px-20">
      <div className="flex w-full flex-col items-center gap-5">
        <div className="text-primary w-fit rounded-full bg-white text-sm font-semibold">
          <div className="bg-primary/10 flex gap-2 rounded-full px-3 py-1">
            <span aria-hidden="true">•</span>
            <span className="uppercase">{t("our_team.caption")}</span>
          </div>
        </div>

        <h2 className="text-center text-xl font-bold text-gray-900 md:text-2xl lg:text-4xl">
          {t("our_team.heading")}
        </h2>
        <p className="w-full text-center text-gray-600 lg:w-[60%]">
          {t("our_team.subheading")}
        </p>
      </div>

      <div className="z-20 grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <div
            key={member.id}
            className="group grid h-100 grid-rows-[6fr_3fr] overflow-hidden rounded-lg bg-[#F5F8FB] shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          >
            {/* Image - first half */}
            <div className="relative overflow-hidden">
              <Image
                src={member.image}
                alt={`${member.name}`}             
                className="transition-transform duration-300 group-hover:scale-105 object-cover"
                height={300}
              />
            </div>

            {/* Content - second half */}
            <div className="flex flex-col items-center justify-center gap-2">
              <Link href={member.linkedin} target="blank">
                <Image
                  src={linkedinIcon}
                  alt="Likedin icon"
                  className="h-6 w-6"
                />
              </Link>

              <div className="text-center">
                <h3 className="line-clamp-1 font-semibold text-gray-900">
                  {member.name}
                </h3>
                <span className="text-sm text-gray-600 uppercase">
                  {member.role}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
