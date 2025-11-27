import React from "react";
import { colors } from "./colors";

export const PolicySidebar = ({
  items,
  activeSection,
  setActiveSection,
}: {
  items: Array<{ id: string; label: string }>;
  activeSection: string;
  setActiveSection: (s: string) => void;
}) => {
  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-8">
        <h2 className="mb-4 text-lg font-semibold" style={{ color: colors.primary }}>
          Quick Navigation
        </h2>
        <nav className="space-y-2">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                activeSection === item.id
                  ? "border-l-4 border-blue-700 bg-blue-50 text-blue-700"
                  : "hover:bg-gray-50"
              }`}
              style={{ color: activeSection === item.id ? colors.primary : colors.muted }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default PolicySidebar;
