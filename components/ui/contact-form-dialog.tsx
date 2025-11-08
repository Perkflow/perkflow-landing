"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useFormRefresh } from "@/hooks/use-form-refresh";
import axios from "axios";
import { useTranslations } from "next-intl";

interface ContactFormDialogProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function ContactFormDialog({
  title,
  description,
  children,
}: ContactFormDialogProps) {
  const t = useTranslations("HomePage.ContactFormDialog");
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Use the form refresh hook
  const { handleFormSuccess } = useFormRefresh({
    shouldRefresh: true,
    refreshDelay: 1000,
    useRouterRefresh: true,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const full_name = `${formData.get("firstName") || ""} ${
      formData.get("lastName") || ""
    }`.trim();
    const payload = {
      full_name,
      email: String(formData.get("email") || ""),
      message: String(formData.get("message") || ""),
      // omit phone/countryCode - backend ignores unknown keys; UI unchanged
    };

    try {
      setSubmitting(true);
      await axios.post("/api/requests/contact", payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      toast.success(t("form.successMessage.text"));
      handleFormSuccess(() => {
        setIsOpen(false);
      });
    } catch (err: any) {
      toast.error(
        err?.response?.data?.error ||
          "Failed to submit your request, please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="w-full max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="w-100">{description}</DialogDescription>
        </DialogHeader>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* First and Last Name */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                {t("form.firstName.label")}
              </label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder={t("form.firstName.placeholder")}
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                {t("form.lastName.label")}
              </label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder={t("form.lastName.placeholder")}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              {t("form.email.label")}
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder={t("form.email.placeholder")}
              required
            />
          </div>

          {/* Phone Number + Country Code */}
          <div>
            <label
              htmlFor="phone"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              {t("form.phone.label")}
            </label>
            <PhoneInput
              inputProps={{
                name: "phone",
                required: true,
              }}
              country={"us"}
              inputClass="!w-full !rounded-md !border !border-gray-300 !px-4 !py-2 !pl-12"
              buttonClass="!border-r"
              containerClass="!w-full"
              enableSearch
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              {t("form.message.label")}
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder={t("form.message.placeholder")}
              className="focus:ring-primary w-full rounded-md border border-gray-300 p-2 text-sm focus:ring-2 focus:outline-none"
            />
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting
                ? t("form.submitButton.loading", { default: "Submitting..." })
                : t("form.submitButton.text")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
