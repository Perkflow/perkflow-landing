"use client";
import React, { useState } from "react";
import { Clock, Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import { TermsHeader } from "@/features/(trip-website)/landing-pages/components/terms/header";
import { QuickSidebar } from "@/features/(trip-website)/landing-pages/components/terms/quick-sidebar";
import { SectionHeader } from "./section-header";
import { InfoBox } from "./info-box";

export const colors = {
  primary: "#003846",
  secondary: "#343A40",
  muted: "#868E96",
  orange: "#E67700",
  green: "#087F5B",
  red: "#C92A2A",
  lightGray: "#ADB5BD",
  darkGray: "#495057",
  lightBg: "#F8F9FA",
  errorBg: "#FFF5F5",
  warningBg: "#FFF9DB",
  successBg: "#E6FCF5",
  dark: "#0B0019",
  slate: "#475467",
};

const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState("acceptance");

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.lightBg }}>
      <div className="mx-auto mt-[80px] max-w-7xl px-4 py-8">
        {/* Header */}
        <TermsHeader />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Navigation Sidebar */}
          <QuickSidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="rounded-lg bg-white p-8 shadow-sm">
              {/* Acceptance of Terms */}
              <section id="acceptance" className="mb-12">
                <SectionHeader>Acceptance of Terms</SectionHeader>
                <p className="mb-4" style={{ color: colors.secondary }}>
                  By accessing and using our automated reward system (the
                  Service), you accept and agree to be bound by the terms and
                  provision of this agreement. If you do not agree to abide by
                  the above, please do not use this service.
                </p>
                <p style={{ color: colors.secondary }}>
                  These Terms of Service constitute a legally binding agreement
                  between you and our company regarding your use of the
                  automated reward system platform.
                </p>
              </section>

              {/* Reward System */}
              <section id="reward" className="mb-12">
                <SectionHeader>Reward System Overview</SectionHeader>
                <p className="mb-4" style={{ color: colors.secondary }}>
                  Our automated reward system operates on a points-based
                  mechanism where users earn rewards through various qualifying
                  activities. The system automatically tracks and calculates
                  rewards based on predefined criteria.
                </p>
                <InfoBox type="warning">
                  Reward values, availability, and redemption options are
                  subject to change at our discretion.
                </InfoBox>
              </section>

              {/* Task System */}
              <section id="task" className="mb-12">
                <SectionHeader>Task System</SectionHeader>
                <p className="mb-6" style={{ color: colors.secondary }}>
                  Our task system allows users to create, participate in, and
                  complete various types of tasks to earn rewards and achieve
                  milestones.
                </p>

                <h4
                  className="mb-4 font-semibold"
                  style={{ color: colors.primary }}
                >
                  Task Categories:
                </h4>

                <div className="mb-6 space-y-4">
                  <InfoBox type="info" title="Community Challenges">
                    Platform-wide challenges and competitions with special
                    rewards and recognition.
                  </InfoBox>

                  <InfoBox type="success" title="Sponsored Tasks">
                    Tasks created by partners and sponsors offering premium
                    rewards and opportunities.
                  </InfoBox>
                </div>

                <h4
                  className="mb-4 font-semibold"
                  style={{ color: colors.primary }}
                >
                  Task Completion Requirements
                </h4>
                <ul
                  className="mb-4 space-y-2"
                  style={{ color: colors.secondary }}
                >
                  <li>• Tasks must be completed honestly and authentically</li>
                  <li>
                    • Evidence of completion may be required for verification
                  </li>
                  <li>
                    • Tasks must comply with platform guidelines and applicable
                    laws
                  </li>
                  <li>
                    • Fraudulent task completion will result in account
                    penalties
                  </li>
                  <li>• Some tasks may have time limits or expiration dates</li>
                </ul>
              </section>

              {/* Milestones & Achievements */}
              <section id="milestones" className="mb-12">
                <SectionHeader>Milestones & Achievements</SectionHeader>
                <p className="mb-6" style={{ color: colors.secondary }}>
                  Our milestone system recognizes and celebrates user
                  achievements through various levels of recognition and
                  rewards.
                </p>

                <h4
                  className="mb-4 font-semibold"
                  style={{ color: colors.primary }}
                >
                  Achievement Types:
                </h4>
                <ul
                  className="mb-6 space-y-2"
                  style={{ color: colors.secondary }}
                >
                  <li>
                    • <strong>Task Completion Milestones:</strong> Recognition
                    for completing specific numbers of tasks
                  </li>
                  <li>
                    • <strong>Consistency Streaks:</strong> Rewards for
                    maintaining regular activity over time
                  </li>
                  <li>
                    • <strong>Quality Achievements:</strong> Recognition for
                    high-quality task completion and community contribution
                  </li>
                  <li>
                    • <strong>Community Milestones:</strong> Achievements for
                    helping others and contributing to the community
                  </li>
                </ul>
              </section>

              {/* Reward Distribution */}
              <section id="distribution" className="mb-12">
                <SectionHeader>Reward Distribution</SectionHeader>
                <p className="mb-6" style={{ color: colors.secondary }}>
                  Rewards are distributed automatically based on task
                  completion, milestone achievement, and community
                  participation. All rewards are subject to verification and
                  platform guidelines.
                </p>

                <InfoBox type="success" title="Reward Types Available">
                  <div className="space-y-4">
                    <div>
                      <h5
                        className="mb-2 font-semibold"
                        style={{ color: colors.green }}
                      >
                        Digital Rewards
                      </h5>
                      <ul className="space-y-1 text-sm">
                        <li>• Platform points and credits</li>
                        <li>• Digital badges and certificates</li>
                        <li>• Premium feature access</li>
                        <li>• Exclusive content and resources</li>
                      </ul>
                    </div>
                    <div>
                      <h5
                        className="mb-2 font-semibold"
                        style={{ color: colors.green }}
                      >
                        Physical Rewards
                      </h5>
                      <ul className="space-y-1 text-sm">
                        <li>• Gift cards and vouchers</li>
                        <li>• Merchandise and branded items</li>
                        <li>• Cash rewards (where applicable)</li>
                      </ul>
                    </div>
                  </div>
                </InfoBox>
              </section>

              {/* Task Verification */}
              <section id="verification" className="mb-12">
                <SectionHeader>Task Verification Process</SectionHeader>
                <p className="mb-6" style={{ color: colors.secondary }}>
                  To maintain platform integrity and ensure fair reward
                  distribution, all completed tasks undergo verification through
                  our automated and manual review processes.
                </p>

                <InfoBox type="info" title="Automated Verification">
                  <ul className="space-y-2 text-sm">
                    <li>• Real-time validation of task completion criteria</li>
                    <li>• Integration with third-party platforms and APIs</li>
                    <li>
                      • Timestamp and location verification where applicable
                    </li>
                    <li>
                      • Pattern recognition for suspicious activity detection
                    </li>
                  </ul>
                </InfoBox>

                <InfoBox
                  type="error"
                  title="Verification Failure Consequences"
                  className="mt-4"
                >
                  <p className="mb-2 text-sm">
                    Tasks that fail verification may result in:
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li>• Denial of associated rewards and points</li>
                    <li>• Account warnings or temporary restrictions</li>
                    <li>
                      •{" "}
                      <strong>
                        Permanent account suspension for repeated violations
                      </strong>
                    </li>
                    <li>• Removal from leaderboards and public showcases</li>
                  </ul>
                </InfoBox>
              </section>

              {/* Account Management */}
              <section id="security" className="mb-12">
                <SectionHeader>Account Management & Security</SectionHeader>
                <p className="mb-6" style={{ color: colors.secondary }}>
                  Users are responsible for maintaining the security and
                  accuracy of their accounts. Proper account management ensures
                  fair participation and protects both individual users and the
                  community.
                </p>

                <h4
                  className="mb-4 font-semibold"
                  style={{ color: colors.primary }}
                >
                  User Responsibilities:
                </h4>
                <ul
                  className="mb-6 space-y-2"
                  style={{ color: colors.secondary }}
                >
                  <li>
                    • <strong>Account Security:</strong> Maintain strong
                    passwords, enable two-factor authentication, and protect
                    login credentials
                  </li>
                  <li>
                    • <strong>Information Accuracy:</strong> Keep profile
                    information, contact details, and payment information
                    current and accurate
                  </li>
                  <li>
                    • <strong>Unauthorized Access:</strong> Immediately report
                    any suspected unauthorized access or security breaches
                  </li>
                  <li>
                    • <strong>Account Sharing:</strong> Do not share account
                    credentials or allow others to use your account
                  </li>
                </ul>

                <InfoBox type="error" title="Account Suspension and Penalties">
                  <p className="mb-2 text-sm">
                    Accounts may be subject to penalties for violations
                    including:
                  </p>
                  <div className="space-y-3 text-sm">
                    <div>
                      <h5
                        className="font-semibold"
                        style={{ color: colors.red }}
                      >
                        Minor Violations
                      </h5>
                      <ul className="ml-4 space-y-1">
                        <li>• Warning notifications</li>
                        <li>• Temporary feature restrictions</li>
                        <li>• Reward earning limitations</li>
                      </ul>
                    </div>
                    <div>
                      <h5
                        className="font-semibold"
                        style={{ color: colors.red }}
                      >
                        Major Violations
                      </h5>
                      <ul className="ml-4 space-y-1">
                        <li>• Account suspension (7-30 days)</li>
                        <li>• Permanent account termination</li>
                        <li>• Forfeiture of earned rewards</li>
                      </ul>
                    </div>
                  </div>
                </InfoBox>
              </section>

              {/* User Conduct */}
              <section id="conduct" className="mb-12">
                <SectionHeader>
                  User Conduct & Community Guidelines
                </SectionHeader>
                <p className="mb-6" style={{ color: colors.secondary }}>
                  Our platform thrives on positive community interaction and
                  fair participation. All users must adhere to our conduct
                  guidelines to maintain a supportive and productive
                  environment.
                </p>

                <InfoBox type="success" title="Encouraged Behaviors">
                  <ul className="space-y-2 text-sm">
                    <li>• Honest and authentic task completion</li>
                    <li>• Supportive community interaction</li>
                    <li>• Constructive feedback and collaboration</li>
                    <li>• Respect for diverse perspectives and backgrounds</li>
                    <li>• Sharing knowledge and helping others</li>
                    <li>• Celebrating community achievements</li>
                    <li>• Providing accurate information and resources</li>
                    <li>• Following platform guidelines and best practices</li>
                  </ul>
                </InfoBox>

                <InfoBox
                  type="error"
                  title="Prohibited Activities"
                  className="mt-4"
                >
                  <ul className="space-y-2 text-sm">
                    <li>• Fraudulent task completion or gaming the system</li>
                    <li>• Creating multiple accounts or fake profiles</li>
                    <li>• Harassment, bullying, or discriminatory behavior</li>
                    <li>• Attempting to exploit platform vulnerabilities</li>
                    <li>• Selling or transferring accounts or rewards</li>
                    <li>• Spamming or excessive self-promotion</li>
                    <li>• Violating intellectual property rights</li>
                  </ul>
                </InfoBox>
              </section>

              {/* Intellectual Property Rights */}
              <section id="intellectual-property" className="mb-12">
                <SectionHeader>Intellectual Property Rights</SectionHeader>
                <p className="mb-6" style={{ color: colors.secondary }}>
                  Intellectual property rights are important to both our
                  platform and our users. This section outlines the ownership
                  and usage rights for content created and shared on our
                  platform.
                </p>

                <div
                  className="mb-6 rounded-lg border p-4"
                  style={{ borderColor: colors.lightGray }}
                >
                  <h4
                    className="mb-4 font-semibold"
                    style={{ color: colors.primary }}
                  >
                    Platform Content
                  </h4>
                  <p className="mb-4" style={{ color: colors.secondary }}>
                    All platform features, design elements, algorithms, and
                    proprietary technology remain the exclusive property of our
                    company. This includes:
                  </p>
                  <ul className="space-y-2" style={{ color: colors.secondary }}>
                    <li>
                      • Task recommendation algorithms and matching systems
                    </li>
                    <li>• Reward calculation and distribution mechanisms</li>
                    <li>
                      • Platform interface design and user experience elements
                    </li>
                    <li>• Proprietary analytics and reporting tools</li>
                  </ul>
                </div>

                <div
                  className="mb-6 rounded-lg border p-4"
                  style={{ borderColor: colors.lightGray }}
                >
                  <h4
                    className="mb-4 font-semibold"
                    style={{ color: colors.primary }}
                  >
                    User-Generated Content
                  </h4>
                  <p className="mb-4" style={{ color: colors.secondary }}>
                    Users retain ownership of original content they create,
                    while granting us necessary licenses for platform operation:
                  </p>
                  <ul className="space-y-2" style={{ color: colors.secondary }}>
                    <li>
                      • Task descriptions, progress updates, and achievement
                      documentation
                    </li>
                    <li>
                      • Profile information, photos, and personal milestone
                      descriptions
                    </li>
                    <li>
                      • Community contributions, comments, and shared resources
                    </li>
                    <li>
                      • Creative works and projects showcased through the
                      platform
                    </li>
                  </ul>
                </div>

                <div
                  className="rounded-lg border p-4"
                  style={{ borderColor: colors.lightGray }}
                >
                  <h4
                    className="mb-4 font-semibold"
                    style={{ color: colors.primary }}
                  >
                    Usage License
                  </h4>
                  <p style={{ color: colors.secondary }}>
                    By sharing content on our platform, you grant us a
                    non-exclusive, worldwide, royalty-free license to use,
                    display, and distribute your content for platform operation,
                    including showcasing achievements, creating community
                    highlights, and improving our services. You may revoke this
                    license by removing your content or closing your account.
                  </p>
                </div>
              </section>

              {/* Terms Modifications & Updates */}
              <section id="modifications" className="mb-12">
                <SectionHeader>Terms Modifications & Updates</SectionHeader>
                <p className="mb-6" style={{ color: colors.secondary }}>
                  We are committed to protecting your privacy and handling your
                  personal data responsibly. Our data practices comply with
                  applicable privacy laws and regulations, including GDPR, CCPA,
                  and other regional privacy requirements.
                </p>

                <div
                  className="mb-6 rounded-lg border p-4"
                  style={{ borderColor: colors.lightGray }}
                >
                  <h4
                    className="mb-4 font-semibold"
                    style={{ color: colors.primary }}
                  >
                    Notification Process
                  </h4>
                  <p className="mb-4" style={{ color: colors.secondary }}>
                    We will notify users of material changes through:
                  </p>
                  <ul className="space-y-2" style={{ color: colors.secondary }}>
                    <li>
                      • Email notifications to all registered users (30 days
                      advance notice)
                    </li>
                    <li>• Prominent in-app notifications and banners</li>
                    <li>• Updates to our website and help documentation</li>
                    <li>
                      • Social media announcements for significant changes
                    </li>
                  </ul>
                </div>

                <InfoBox type="warning" title="Minor Updates" className="mb-4">
                  Clarifications, formatting improvements, and non-material
                  changes may be implemented immediately with notification
                  through our platform.
                </InfoBox>

                <div
                  className="rounded-lg border p-4"
                  style={{ borderColor: colors.lightGray }}
                >
                  <h4
                    className="mb-4 font-semibold"
                    style={{ color: colors.primary }}
                  >
                    Major Changes
                  </h4>
                  <p className="mb-4" style={{ color: colors.secondary }}>
                    Significant modifications affecting user rights, reward
                    structures, or platform functionality will include a 30-day
                    notice period and may require explicit user acceptance.
                  </p>
                  <p style={{ color: colors.secondary }}>
                    Continued use of the platform after the effective date of
                    any modifications constitutes acceptance of the updated
                    terms. Users who do not agree with the changes may close
                    their accounts before the effective date.
                  </p>
                </div>
              </section>

              {/* Account Termination & Data Retention */}
              <section id="termination" className="mb-12">
                <SectionHeader>
                  Account Termination & Data Retention
                </SectionHeader>
                <p className="mb-6" style={{ color: colors.secondary }}>
                  Both users and our platform have the right to terminate
                  accounts under certain circumstances. This section outlines
                  the termination process and its implications for data and
                  rewards.
                </p>

                <div
                  className="mb-6 rounded-lg border p-4"
                  style={{ borderColor: colors.lightGray }}
                >
                  <h4
                    className="mb-4 font-semibold"
                    style={{ color: colors.primary }}
                  >
                    User-Initiated Termination
                  </h4>
                  <p className="mb-4" style={{ color: colors.secondary }}>
                    Users may close their accounts at any time through account
                    settings. Upon voluntary termination:
                  </p>
                  <ul className="space-y-2" style={{ color: colors.secondary }}>
                    <li>• Account access is immediately disabled</li>
                    <li>• Pending rewards are processed within 30 days</li>
                    <li>• Personal data is deleted within 90 days</li>
                    <li>• Public achievements may remain anonymized</li>
                    <li>• Account reactivation possible within 30 days</li>
                  </ul>
                </div>

                <InfoBox
                  type="error"
                  title="Platform-Initiated Termination"
                  className="mb-6"
                >
                  <p className="mb-4 text-sm">
                    We may terminate accounts for violations of these terms. In
                    such cases:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>• Immediate account suspension and access removal</li>
                    <li>• Forfeiture of pending and unredeemed rewards</li>
                    <li>• Removal from all leaderboards and showcases</li>
                    <li>• Permanent ban from creating new accounts</li>
                    <li>• Data retention for legal and security purposes</li>
                  </ul>
                </InfoBox>

                <div
                  className="rounded-lg border p-4"
                  style={{ borderColor: colors.lightGray }}
                >
                  <h4
                    className="mb-4 font-semibold"
                    style={{ color: colors.primary }}
                  >
                    Data Retention Policy
                  </h4>
                  <p className="mb-4" style={{ color: colors.secondary }}>
                    After account termination, we retain certain data as
                    follows:
                  </p>
                  <ul className="space-y-2" style={{ color: colors.secondary }}>
                    <li>
                      • Transaction records: 7 years (for tax and legal
                      compliance)
                    </li>
                    <li>
                      • Security logs: 2 years (for fraud prevention and
                      investigation)
                    </li>
                    <li>
                      • Anonymized analytics: Indefinitely (for platform
                      improvement)
                    </li>
                    <li>
                      • Legal hold data: Until resolution of any pending legal
                      matters
                    </li>
                  </ul>
                </div>
              </section>

              {/* Dispute Resolution & Legal Framework */}
              <section id="dispute-resolution" className="mb-12">
                <SectionHeader>
                  Dispute Resolution & Legal Framework
                </SectionHeader>
                <p className="mb-6" style={{ color: colors.secondary }}>
                  We are committed to resolving disputes fairly and efficiently.
                  Our multi-tiered approach ensures that most issues can be
                  resolved quickly while providing formal legal recourse when
                  necessary.
                </p>

                <div
                  className="mb-6 rounded-lg border p-4"
                  style={{ borderColor: colors.lightGray }}
                >
                  <h4
                    className="mb-4 font-semibold"
                    style={{ color: colors.primary }}
                  >
                    Step 1: Direct Resolution
                  </h4>
                  <p className="mb-4" style={{ color: colors.secondary }}>
                    We encourage users to first attempt direct resolution
                    through our support channels:
                  </p>
                  <ul className="space-y-2" style={{ color: colors.secondary }}>
                    <li>• In-app support chat and help center</li>
                    <li>• Email support with dedicated response team</li>
                    <li>• Community forums and peer assistance</li>
                    <li>• Video call support for complex issues</li>
                  </ul>
                  <p className="mt-4" style={{ color: colors.secondary }}>
                    <strong>Response Time:</strong> We aim to respond to all
                    support requests within 24 hours and resolve most issues
                    within 5 business days.
                  </p>
                </div>

                <InfoBox
                  type="info"
                  title="Step 2: Formal Mediation"
                  className="mb-6"
                >
                  <p className="mb-4 text-sm">
                    For unresolved disputes, we offer formal mediation services:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>• Independent third-party mediation</li>
                    <li>• Structured negotiation process</li>
                    <li>• Binding resolution agreements</li>
                    <li>• Cost-sharing arrangements for mediation fees</li>
                  </ul>
                </InfoBox>

                <div
                  className="rounded-lg border p-4"
                  style={{ borderColor: colors.lightGray }}
                >
                  <h4
                    className="mb-4 font-semibold"
                    style={{ color: colors.primary }}
                  >
                    Step 3: Legal Arbitration
                  </h4>
                  <p className="mb-4" style={{ color: colors.secondary }}>
                    As a final resort, disputes may be subject to binding
                    arbitration:
                  </p>
                  <ul className="space-y-2" style={{ color: colors.secondary }}>
                    <li>• Governed by the laws of [Your Jurisdiction]</li>
                    <li>• Conducted by qualified arbitration services</li>
                    <li>
                      • Individual arbitration (class action waiver applies
                      where legally permitted)
                    </li>
                    <li>• Limited discovery and streamlined procedures</li>
                  </ul>
                </div>
              </section>

              {/* Contact Information */}
              <section id="contact" className="mb-12">
                <SectionHeader>Contact Information & Support</SectionHeader>
                <p className="mb-6" style={{ color: colors.secondary }}>
                  We re here to help! For questions about these Terms and
                  Conditions, our task and reward platform, or any issues you
                  may encounter, please dont hesitate to reach out through any
                  of our support channels.
                </p>

                <div className="space-y-6">
                  <InfoBox type="info" title="General Support">
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-blue-600" />
                        <span>
                          <strong>Email:</strong> support@perkflow.com
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-blue-600" />
                        <span>
                          <strong>Phone:</strong> 1-800-TASK-HELP
                          (1-800-827-5435)
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MessageCircle className="h-4 w-4 text-blue-600" />
                        <span>
                          <strong>Live Chat:</strong> Available 24/7 through our
                          app
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span>
                          <strong>Hours:</strong> Monday-Friday, 8:00 AM - 8:00
                          PM EST, weekend support: 10:00 AM - 6:00 PM EST
                        </span>
                      </div>
                    </div>
                  </InfoBox>

                  <InfoBox type="info" title="Legal & Privacy">
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-blue-600" />
                        <span>
                          <strong>Legal:</strong> legal@perkflow.com
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-blue-600" />
                        <span>
                          <strong>Privacy:</strong> privacy@perkflow.com
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-blue-600" />
                        <span>
                          <strong>Security:</strong> security@perkflow.com
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <span>
                          <strong>Mailing Address:</strong> Perk flow 2261
                          Market Street STE 85409 San Francisco, CA 94114
                        </span>
                      </div>
                    </div>
                  </InfoBox>
                </div>
              </section>

              {/* Footer */}
              <div
                className="mt-12 border-t pt-8"
                style={{ borderColor: colors.lightGray }}
              >
                <p
                  className="mb-6 text-center"
                  style={{ color: colors.secondary }}
                >
                  By continuing to use our platform, you acknowledge that you
                  have read and agree to these Terms and Conditions.
                </p>

                <div className="flex justify-center gap-4">
                  <button
                    className="rounded-lg px-6 py-3 font-medium text-white"
                    style={{ backgroundColor: colors.primary }}
                  >
                    Accept
                  </button>
                  <button
                    className="rounded-lg border px-6 py-3 font-medium"
                    style={{
                      color: colors.muted,
                      borderColor: colors.lightGray,
                    }}
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
