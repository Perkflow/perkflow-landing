"use client";
import { MapPin, Mail, Phone } from "lucide-react";
import React, { useState } from "react";
import EnterpriseBgImg2 from "@/assets/images/enterprise-bg-2.png";
import PhoneInput from "react-phone-input-2";
import Container from "@/components/layouts/container";
import { toast } from "sonner";
import { useFormRefresh } from "@/hooks/use-form-refresh";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("Contact_Page");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use the form refresh hook
  const { handleFormSuccess } = useFormRefresh({
    shouldRefresh: true,
    refreshDelay: 1000,
    useRouterRefresh: true,
  });

  const contact = {
    title: t("title"),
    content: t("content"),
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.message
    ) {
      toast.error(t("form.errorMessage.requiredFields"));
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Form submitted:", formData);

      const response = await fetch("/api/requests/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      console.log("API Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(errorData.message || "Failed to send message");
      }

      const result = await response.json();
      console.log("API Success:", result);

      // Use the form refresh hook to handle success and page refresh
      handleFormSuccess(() => {
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      });

      toast.success(t("form.successMessage.text"));
    } catch (error: any) {
      console.error("Form submission error:", error);
      toast.error(error.message || t("form.errorMessage.generic"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center py-16 text-[var(--foreground)] mt-16">
      <Container className="px-2 sm:px-3 lg:px-4">
        <div className="flex flex-col-reverse items-center gap-10 overflow-hidden rounded-lg text-[var(--card-foreground)] md:flex-row md:items-start md:gap-20">
          {/* Left Column */}
          <div className="flex w-full flex-col justify-center gap-5 px-2 md:w-1/2 md:px-4">
            <h2 className="text-xl font-bold text-[var(--foreground)] md:text-3xl">
              {contact.title}
            </h2>

            <p className="text-sm text-[var(--muted-foreground)] md:text-base">
              {contact.content}
            </p>

            <div
              className="bg-primary relative flex flex-col gap-6 rounded-lg px-8 py-6 text-sm text-[var(--sidebar-primary-foreground)]"
              style={{
                backgroundImage: `url(${EnterpriseBgImg2.src})`,
                backgroundPosition: "right -100px bottom",
                backgroundSize: "200px",
                backgroundRepeat: "no-repeat",
              }}
            >
              <p className="flex items-center gap-2">
                <Phone /> 1 (716) 451-3912
              </p>
              <p className="flex items-center gap-2">
                <Mail /> hello@perkflow.io
              </p>
              <p className="flex items-start gap-2">
                <MapPin />
                2261 Market Street STE 85409 <br /> San Francisco, CA 94114
              </p>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="w-full md:w-1/2">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <h2 className="mb-2 text-xl font-semibold">{t("form.title")}</h2>

              <div className="flex flex-col gap-4 md:flex-row">
                <div className="w-full">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium"
                  >
                    {t("form.firstName.label")}
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder={t("form.firstName.placeholder")}
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-[var(--border)] bg-white px-4 py-2 text-[var(--foreground)]"
                  />
                </div>

                <div className="w-full">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium"
                  >
                    {t("form.lastName.label")}
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder={t("form.lastName.placeholder")}
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-[var(--border)] bg-white px-4 py-2 text-[var(--foreground)]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  {t("form.email.label")}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("form.email.placeholder")}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-[var(--border)] bg-white px-4 py-2 text-[var(--foreground)]"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-1 block text-sm font-medium"
                >
                  {t("form.phone.label")}
                </label>
                <PhoneInput
                  country={"us"}
                  inputProps={{
                    name: "phone",
                    required: true,
                  }}
                  value={formData.phone}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, phone: value }))
                  }
                  inputClass="!w-full !rounded-md !border !border-[var(--border)] !bg-white !px-4 !py-2 !pl-12 !text-[var(--foreground)]"
                  buttonClass="!border-r"
                  containerClass="!w-full"
                  enableSearch
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium">
                  {t("form.message.label")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder={t("form.message.placeholder")}
                  className="w-full rounded-md border border-[var(--border)] bg-white px-4 py-2 text-[var(--foreground)]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`rounded-full bg-[var(--primary)] px-4 py-2 text-[var(--primary-foreground)] transition ${
                  isSubmitting
                    ? "cursor-not-allowed opacity-60"
                    : "hover:brightness-90"
                }`}
              >
                {isSubmitting
                  ? t("form.submitButton.submitting")
                  : t("form.submitButton.text")}
              </button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}
