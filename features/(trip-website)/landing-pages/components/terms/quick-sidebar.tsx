import React from "react";
import { colors } from "@/features/(trip-website)/landing-pages/components/terms/terms-and-conditions";

export const QuickSidebar = ({
  setActiveSection,
  activeSection,
}: {
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
  activeSection: string;
}) => {
  const navigationItems = [
    { id: "acceptance", label: "Acceptance of service" },
    { id: "reward", label: "Reward system" },
    { id: "task", label: "Task system" },
    { id: "milestones", label: "Milestones & Achievements" },
    { id: "distribution", label: "Reward Distribution" },
    { id: "verification", label: "Task Verification Process" },
    { id: "security", label: "Account Management & Security" },
    { id: "conduct", label: "User Conduct & Community Guidelines" },
    { id: "intellectual-property", label: "Intellectual Property Rights" }, // Fixed: was "ip"
    { id: "modifications", label: "Terms Modifications & Updates" },
    { id: "termination", label: "Account Termination & Data Retention" },
    { id: "dispute-resolution", label: "Dispute Resolution & Legal Framework" }, // Fixed: was "disputes"
    { id: "contact", label: "Contact Information and support" },
  ];

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    // Scroll to the section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-8">
        <h2
          className="mb-4 text-lg font-semibold"
          style={{ color: colors.primary }}
        >
          Quick Navigation
        </h2>
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                activeSection === item.id
                  ? "border-l-4 border-blue-700 bg-blue-50 text-blue-700"
                  : "hover:bg-gray-50"
              }`}
              style={{
                color:
                  activeSection === item.id ? colors.primary : colors.muted,
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};
