import React from "react";
import { useEditorStore } from "@/store/editor.store";
import { Experience } from "@/components/ExperienceSection";
import BulletListEditor from "./BulletListEditor";
import FormInput from "../common/FormInput";

const ExperienceEditor: React.FC = () => {
  const { experiences, setExperiences } = useEditorStore();

  const handleChange = (idx: number, key: keyof Experience, value: any) => {
    const updated = experiences.map((exp, i) =>
      i === idx ? { ...exp, [key]: value } : exp
    );
    setExperiences(updated);
  };

  const setBulletList = (expIdx: number, bullets: string[]) => {
    const updated = experiences.map((exp, i) =>
      i === expIdx ? { ...exp, bullets } : exp
    );
    setExperiences(updated);
  };

  const addExperience = () => {
    const blank: Experience = {
      company: "",
      position: "",
      location: "",
      from: "",
      to: "",
      summary: "",
      bullets: [""]
    };
    setExperiences([...experiences, blank]);
  };

  const removeExperience = (idx: number) => {
    if (experiences.length === 1) return;
    setExperiences(experiences.filter((_, i) => i !== idx));
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Experience</h2>
        <button
          type="button"
          onClick={addExperience}
          className="px-3 py-1 text-sm text-white bg-blue-500 rounded"
        >
          + Add Experience
        </button>
      </div>
      {experiences.map((exp, idx) => (
        <div key={idx} className="mb-6 p-4 border rounded-lg relative">
          <FormInput
            placeholder="Company"
            value={exp.company}
            onChange={value => handleChange(idx, "company", value)}
          />
          <FormInput
            placeholder="Position"
            value={exp.position}
            onChange={value => handleChange(idx, "position", value)}
          />
          <FormInput
            placeholder="Location"
            value={exp.location}
            onChange={value => handleChange(idx, "location", value)}
          />
          <FormInput
            placeholder="From (e.g. Jan 2020)"
            value={exp.from}
            onChange={value => handleChange(idx, "from", value)}
          />
          <FormInput
            placeholder="To (e.g. Dec 2022 or leave blank for Current)"
            value={exp.to ?? ""}
            onChange={value => handleChange(idx, "to", value)}
          />
          <FormInput
            type="textarea"
            placeholder="Summary paragraph"
            value={exp.summary}
            onChange={value => handleChange(idx, "summary", value)}
          />
          <div className="mb-2">
            <label className="block text-xs mb-1 font-medium text-gray-700">Bullets</label>
            <BulletListEditor
              items={exp.bullets}
              setItems={(bullets) => setBulletList(idx, bullets)}
              placeholderPrefix="Bullet"
            />
          </div>
          {experiences.length > 1 && (
            <button
              type="button"
              onClick={() => removeExperience(idx)}
              className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white rounded"
            >
              ✕
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExperienceEditor;
