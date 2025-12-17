import { Button } from "@/components/ui/button";
import ContactFormDialog from "@/components/ui/contact-form-dialog";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function AuthButtons() {
  const t = useTranslations("Header");

  return (
    <div className="flex items-center gap-4">
      <Link href="https://sandbox.perkflow.io">
        <Button variant="ghost">{t("authButtons.login")}</Button>
      </Link>
      <ContactFormDialog
        title={t("contactFormDialog.title")}
        description={t("contactFormDialog.description")}
      >
        <Button>{t("authButtons.buildPlan")}</Button>
      </ContactFormDialog>
    </div>
  );
}
