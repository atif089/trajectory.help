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
      <h2 className="text-[14pt] font-bold">Professional Experience</h2>
      {experiences.map((exp, idx) => (
        <div key={idx} style={{ marginBottom: "2rem" }}>
          <h3>{exp.position} @ {exp.company}</h3>
          <div style={{ fontStyle: "italic", color: "#666" }}>
            {exp.location} | {exp.from} - {exp.to ? exp.to : "Current"}
          </div>
          <p>{exp.summary}</p>
          <ul>
            {exp.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default ExperienceSection;
