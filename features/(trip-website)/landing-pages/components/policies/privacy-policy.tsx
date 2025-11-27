"use client";
import React, { useState } from "react";
import PolicyHeader from "./header";
import PolicySidebar from "./quick-sidebar";
import PolicySectionHeader from "./section-header";
import PolicyInfoBox from "./info-box";
import { colors } from "./colors";

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("overview");

  const navItems = [
    { id: "overview", label: "Overview" },
    { id: "data", label: "Data We Collect" },
    { id: "use", label: "How We Use Data" },
    { id: "choices", label: "Your Choices" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.lightBg }}>
      <div className="mx-auto mt-20 max-w-7xl px-4 py-8">
        <PolicyHeader title="Privacy Policy" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <PolicySidebar items={navItems} activeSection={activeSection} setActiveSection={setActiveSection} />

          <div className="lg:col-span-3">
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <section id="overview" className="mb-12">
                <PolicySectionHeader>Privacy Policy</PolicySectionHeader>
                <p className="mb-4 text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p className="text-gray-700">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              </section>

              <section id="data" className="mb-12">
                <PolicySectionHeader>Data We Collect</PolicySectionHeader>
                <p className="mb-4 text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
                <PolicyInfoBox type="info">This is example information about data collection.</PolicyInfoBox>
              </section>

              <section id="use" className="mb-12">
                <PolicySectionHeader>How We Use Data</PolicySectionHeader>
                <p className="mb-4 text-gray-700">Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>
              </section>

              <section id="choices" className="mb-12">
                <PolicySectionHeader>Your Choices</PolicySectionHeader>
                <p className="mb-4 text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </section>

              <section id="contact" className="mb-12">
                <PolicySectionHeader>Contact</PolicySectionHeader>
                <p className="text-gray-700">Lorem ipsum dolor sit amet.</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
