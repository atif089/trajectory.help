import React from "react";

export interface Experience {
  company: string;
  position: string;
  location: string;
  from: string;
  to?: string;
  summary: string;
  bullets: string[];
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  return (
    <section>
      <h2 className="text-[14pt] font-bold mb-2">Professional Experience</h2>
      {experiences.map((exp, idx) => (
        <div key={idx} className="mb-2">
          <h3 className="text-[12pt]">
            <span className="font-bold">{exp.position}</span> ({exp.company})
          </h3>
          <div className="text-gray-600">
            {exp.location} | {exp.from} - {exp.to ? exp.to : "Current"}
          </div>
          <p className="mt-1">{exp.summary}</p>
        </div>
      ))}
    </section>
  );
};

export default ExperienceSection;
