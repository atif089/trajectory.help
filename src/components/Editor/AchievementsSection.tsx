import React from "react";
import { useEditorStore } from "@/store/editor.store";
import FormField from "../common/FormField";

const AchievementsSection: React.FC = () => {
  const { achievements, setAchievements, achievementsSectionTitle, setAchievementsSectionTitle } = useEditorStore();

  return (
    <>
      <FormField
        fieldTitle="Achievements Section Title"
        placeholder="Achievements Section Title"
        value={achievementsSectionTitle}
        onChange={(value) => {
          console.log("setAchievementsSectionTitle", value);
          setAchievementsSectionTitle(value);
        }}
      />
      <FormField
        fieldTitle="Achievements"
        showWordCount={true}
        placeholder="Your Achievements"
        type="textarea"
        value={achievements}
        onChange={setAchievements}
      />
    </>
  );
};

export default AchievementsSection;
