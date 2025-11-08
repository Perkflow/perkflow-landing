import { BadgeComp } from "@/features/(trip-website)/landing-pages/components/jobs-posting/badge";

export const SkillsTags: React.FC<{ skills: string[] }> = ({ skills }) => (
  <div className="mb-6 flex flex-wrap gap-2">
    {skills.map((skill, index) => (
      <BadgeComp key={index} variant="outline" size="sm">
        {skill}
      </BadgeComp>
    ))}
  </div>
);
