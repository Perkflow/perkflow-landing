import planningImg from "@/assets/images/planning.png";
import { Button } from "@/components/ui/button";
import ContactFormDialog from "@/components/ui/contact-form-dialog";
import Image from "next/image";
import Container from "@/components/layouts/container";
import { useTranslations } from "next-intl";

export default function Planning() {
  const t = useTranslations("HomePage");

  return (
    <section className="bg-[#003B4A] py-32 text-white">
      <Container className="px-2 sm:px-3 lg:px-4">
        <div className="flex flex-col items-center justify-between gap-12 px-2 md:flex-row md:items-center">
          <Image
            src={planningImg}
            alt={`Plan image`}
            width={300}
            height={200}
            quality={100}
            className="h-full object-cover md:w-[50%]"
          />

          <div className="flex w-full flex-col items-center space-y-6 md:w-[40%] md:items-start">
            <h2 className="text-center text-3xl leading-8 font-semibold md:text-start md:text-5xl md:leading-16">
              {t("Planning.heading")}{" "}
              <em className="font-light">{t("Planning.heading-highlight")}</em>.
            </h2>
            <p className="text-center text-base leading-7 text-[#E9ECEF] md:text-start md:text-lg">
              {t("Planning.text")}
            </p>
            <ContactFormDialog
              title={t("ContactFormDialog.planning.title")}
              description={t("ContactFormDialog.planning.description")}
            >
              <Button variant="outline" className="px-5 py-3.5 text-[#0B263B]">
                {t("Planning.cta")}
              </Button>
            </ContactFormDialog>
          </div>
        </div>
      </Container>
    </section>
  );
}
