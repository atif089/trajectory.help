import React from "react";
import ExperienceSection from "../ExperienceSection";
import { useEditorStore } from "@/store/editor.store";

const ExperienceSectionWrapper: React.FC = () => {
  const experiences = useEditorStore((state) => state.experiences);
  return <ExperienceSection experiences={experiences} />;
};

export default ExperienceSectionWrapper;
