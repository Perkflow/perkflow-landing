"use client";
import React, { useState } from "react";
import PolicyHeader from "./header";
import PolicySidebar from "./quick-sidebar";
import PolicySectionHeader from "./section-header";
import PolicyInfoBox from "./info-box";
import { colors } from "./colors";

export default function RefundPolicy() {
  const [activeSection, setActiveSection] = useState("overview");

  const navItems = [
    { id: "overview", label: "Overview" },
    { id: "eligibility", label: "Eligibility" },
    { id: "process", label: "Process" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.lightBg }}>
      <div className="mx-auto mt-20 max-w-7xl px-4 py-8">
        <PolicyHeader title="Refund Policy" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <PolicySidebar items={navItems} activeSection={activeSection} setActiveSection={setActiveSection} />

          <div className="lg:col-span-3">
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <section id="overview" className="mb-12">
                <PolicySectionHeader>Refund Policy</PolicySectionHeader>
                <p className="mb-4 text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </section>

              <section id="eligibility" className="mb-12">
                <PolicySectionHeader>Eligibility</PolicySectionHeader>
                <p className="mb-4 text-gray-700">Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>
                <PolicyInfoBox type="warning">Eligibility conditions are illustrative only.</PolicyInfoBox>
              </section>

              <section id="process" className="mb-12">
                <PolicySectionHeader>Process</PolicySectionHeader>
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
