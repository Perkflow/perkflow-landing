import { useTranslations } from "next-intl";
import nvidiaLogo from "@/assets/images/logo-nvidia.svg";
import awsLogo from "@/assets/images/logo-aws.svg";
import microsoftLogo from "@/assets/images/logo-microsoft.svg";
import googleCloudLogo from "@/assets/images/logo-google-cloud.svg";
import Image from "next/image";

export default function LeadingCompanies() {
  const t = useTranslations("Why_Us_Page");

  const logos = [
    {
      id: 1,
      name: "Nvidia logo",
      image: nvidiaLogo,
    },
    {
      id: 2,
      name: "AWS logo",
      image: awsLogo,
    },
    {
      id: 3,
      name: "Microsoft logo",
      image: microsoftLogo,
    },
    {
      id: 4,
      name: "Google Cloud logo",
      image: googleCloudLogo,
    },
  ];
  return (
    <div className="flex flex-col items-center gap-8 bg-white px-4 py-10 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-8 items-center justify-center">
        <p className="w-full text-center text-gray-700 lg:w-[60%]">
          {t("leading_companies.text")}
        </p>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-4 lg:w-[80%]">
          {logos.map((logo) => (
            <div
              key={logo.id}
              className="flex items-center justify-center bg-white p-3 shadow-md hover:shadow-lg"
            >
              <Image src={logo.image} alt={`${logo.name}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
