"use client";
import React from "react";
import { JobMetaInfo } from "@/features/(trip-website)/landing-pages/components/jobs-posting/job-meta-info";
import { JobHeader } from "@/features/(trip-website)/landing-pages/components/jobs-posting/job-header";
import { ApplicationDeadline } from "@/features/(trip-website)/landing-pages/components/jobs-posting/application-deadline";
import { CompanyInfo } from "@/features/(trip-website)/landing-pages/components/jobs-posting/company-info";
import { ListComponent } from "@/features/(trip-website)/landing-pages/components/jobs-posting/list-component";
import { SkillsTags } from "@/features/(trip-website)/landing-pages/components/jobs-posting/skills-tag";
import { ContentSection } from "./content-section";
import { BenefitsGrid } from "@/features/(trip-website)/landing-pages/components/jobs-posting/benefits-grid";

// Types
interface JobListingProps {
  job: {
    id: string;
    title: string;
    company: string;
    logo: string;
    location: string;
    type: string;
    salary: string;
    postedDate: string;
    skills: string[];
    description: string;
    responsibilities: string[];
    requirements: string[];
    benefits: string[];
    companyInfo: {
      description: string;
      industry: string;
      size: string;
      rating: number;
    };
    applicationDeadline: string;
  };
}

// Main Job Listing Component
const JobListing: React.FC<JobListingProps> = ({ job }) => {
  const handleApply = () => {
    console.log("Apply clicked for job:", job.id);
  };

  return (
    <div className="mx-auto mt-[80px] min-h-screen max-w-4xl bg-gray-50 p-6">
      <JobHeader
        title={job.title}
        company={job.company}
        logo={job.logo}
        onApply={handleApply}
      />

      <JobMetaInfo
        location={job.location}
        type={job.type}
        salary={job.salary}
        postedDate={job.postedDate}
      />

      <SkillsTags skills={job.skills} />

      <ContentSection title="Job Description">
        <p className="leading-relaxed text-gray-700">{job.description}</p>
      </ContentSection>

      <ContentSection title="Key Responsibilities">
        <ListComponent items={job.responsibilities} />
      </ContentSection>

      <ContentSection title="Requirements">
        <ListComponent items={job.requirements} />
      </ContentSection>

      <ContentSection title="Benefits & Perks">
        <BenefitsGrid benefits={job.benefits} />
      </ContentSection>

      <CompanyInfo companyInfo={job.companyInfo} />

      <ApplicationDeadline deadline={job.applicationDeadline} />
    </div>
  );
};

// Demo Component with Sample Data
const Demo: React.FC = () => {
  const sampleJob = {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechVision Inc",
    logo: "T",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $160,000",
    postedDate: "2 days ago",
    skills: ["React", "TypeScript", "Frontend", "JavaScript", "CSS"],
    description:
      "We are seeking a talented Senior Frontend Developer to join our dynamic team. You will be responsible for developing and maintaining high-quality web applications using modern technologies. This role offers an excellent opportunity to work on cutting-edge projects and collaborate with a team of passionate developers.",
    responsibilities: [
      "Develop and maintain responsive web applications using React and TypeScript",
      "Collaborate with designers to implement pixel-perfect user interfaces",
      "Optimize applications for maximum performance and scalability",
      "Write clean, maintainable, and well-documented code",
      "Participate in code reviews and mentor junior developers",
      "Stay up-to-date with the latest frontend technologies and best practices",
      "Work closely with backend developers to integrate APIs",
      "Contribute to the overall architecture and technical decisions",
    ],
    requirements: [
      "5+ years of experience in frontend development",
      "Expert knowledge of React, TypeScript, and modern JavaScript",
      "Experience with state management libraries (Redux, Zustand)",
      "Strong understanding of responsive design and CSS frameworks",
      "Familiarity with testing frameworks (Jest, React Testing Library)",
      "Experience with Git and collaborative development workflows",
      "Bachelor's degree in Computer Science or related field",
      "Excellent problem-solving and communication skills",
    ],
    benefits: [
      "Competitive salary and equity package",
      "Comprehensive health, dental, and vision insurance",
      "Flexible work arrangements and remote options",
      "Professional development budget",
      "Unlimited PTO policy",
      "Modern equipment and tools",
      "Team building events and company retreats",
      "Stock options and performance bonuses",
    ],
    companyInfo: {
      description:
        "TechVision Inc is a leading technology company focused on creating innovative solutions for businesses. We pride ourselves on fostering a collaborative environment where creativity and technical excellence thrive.",
      industry: "Technology",
      size: "50-200 employees",
      rating: 4.5,
    },
    applicationDeadline: "March 15, 2025",
  };

  return <JobListing job={sampleJob} />;
};

export default Demo;
