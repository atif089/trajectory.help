import React from "react";
import { useEditorStore } from "@/store/editor.store";
import { Experience } from "~/components/MarkdownRenderer/ExperienceSection";
import { Button } from "@/components/common/Button";
import FormField from "@/components/common/FormField";

const ExperienceEditor: React.FC = () => {
  const { experiences, setExperiences } = useEditorStore();

  const handleChange = (idx: number, key: keyof Experience, value: any) => {
    const updated = experiences.map((exp, i) => (i === idx ? { ...exp, [key]: value } : exp));
    setExperiences(updated);
  };

  const addExperience = () => {
    const blank: Experience = {
      company: "",
      position: "",
      location: "",
      from: "",
      to: "",
      experienceSummary: "",
    };
    setExperiences([...experiences, blank]);
  };

  const removeExperience = (idx: number) => {
    if (experiences.length === 1) return;
    setExperiences(experiences.filter((_, i) => i !== idx));
  };

  return (
    <div className="mb-8">
      {experiences.map((exp, idx) => (
        <div key={idx} className="p-2 my-4 border rounded-lg relative">
          <FormField
            fieldTitle="Company"
            placeholder="Company"
            value={exp.company}
            onChange={(value) => handleChange(idx, "company", value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              fieldTitle="Position"
              placeholder="Position"
              value={exp.position}
              onChange={(value) => handleChange(idx, "position", value)}
            />
            <FormField
              fieldTitle="Location"
              placeholder="Location"
              value={exp.location}
              onChange={(value) => handleChange(idx, "location", value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              fieldTitle="From"
              placeholder="From (e.g. Jan 2020)"
              value={exp.from}
              onChange={(value) => handleChange(idx, "from", value)}
            />
            <FormField
              fieldTitle="To"
              placeholder="To (e.g. Dec 2022 or leave blank for Current)"
              value={exp.to ?? ""}
              onChange={(value) => handleChange(idx, "to", value)}
            />
          </div>
          <FormField
            fieldTitle="Experience Summary"
            type="textarea"
            placeholder="Summary paragraph"
            value={exp.experienceSummary}
            onChange={(value) => handleChange(idx, "experienceSummary", value)}
            showWordCount={true}
          />

          {experiences.length > 1 && (
            <div className="flex mt-2 justify-end">
              <Button onClick={() => removeExperience(idx)} size="sm" variant="delete">
                Remove Experience
              </Button>
            </div>
          )}
        </div>
      ))}

      <div className="flex items-center justify-between mb-4">
        <Button onClick={addExperience}>+ Add Experience</Button>
      </div>
    </div>
  );
};

export default ExperienceEditor;
