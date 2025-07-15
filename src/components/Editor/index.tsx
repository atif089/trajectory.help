import React from "react";

import { useEditorStore } from "@/store/editor.store";
import ExperienceEditor from "./ExperienceEditor";
import FormField from "../common/FormField";

const Editor = () => {
  const {
    personName,
    subTitleText,
    enableSummary,
    summary,
    enableAchievements,
    achievements,
    setPersonName,
    setSubTitleText,
    setEnableSummary,
    setSummary,
    setEnableAchievements,
    setAchievements,
  } = useEditorStore();

  return (
    <div
      className="w-full max-w-md my-4 p-4 rounded-lg bg-white border shadow-lg border-gray-200 overflow-y-auto"
      style={{ maxWidth: "800px" }}
    >
      <FormField fieldTitle="Name" placeholder="Your Name" value={personName} onChange={setPersonName} />
      <FormField fieldTitle="Subtitle" placeholder="Your Subtitle" value={subTitleText} onChange={setSubTitleText} />
      <div className="mb-4">
        <input type="checkbox" checked={enableSummary} onChange={(e) => setEnableSummary(e.target.checked)} />
        <span className="ml-2">Enable Summary</span>
      </div>
      <FormField
        fieldTitle="Summary"
        type="textarea"
        showWordCount={true}
        placeholder="Your Summary"
        value={summary}
        disabled={!enableSummary}
        onChange={setSummary}
      />

      <div className="mb-4">
        <input type="checkbox" checked={enableAchievements} onChange={(e) => setEnableAchievements(e.target.checked)} />
        <span className="ml-2">Enable Achievements</span>
      </div>
      <FormField
        fieldTitle="Achievements"
        showWordCount={true}
        placeholder="Your Achievements"
        type="textarea"
        value={achievements}
        disabled={!enableAchievements}
        onChange={setAchievements}
      />

      <ExperienceEditor />
    </div>
  );
};

export default Editor;
