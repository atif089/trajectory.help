import React from "react";

import { useEditorStore } from "@/store/editor.store";
import ExperienceEditor from "./ExperienceEditor";
import BulletListEditor from "./BulletListEditor";
import FormField from "../common/FormField";
import FormInput from "../common/FormInput";

const Editor = ({ editorTitle }: { editorTitle: string }) => {
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
      <h1 className="text-3xl font-bold mb-8">{editorTitle}</h1>

      <FormField fieldTitle="Name">
        <FormInput
          placeholder="Your Name"
          value={personName}
          onChange={setPersonName}
        />
      </FormField>
      <FormField fieldTitle="Subtitle">
        <FormInput
          placeholder="Your Subtitle"
          value={subTitleText}
          onChange={setSubTitleText}
        />
      </FormField>
      <FormField fieldTitle="Summary">
        <input type="checkbox" checked={enableSummary} onChange={(e) => setEnableSummary(e.target.checked)} />
        <FormInput
          type="textarea"
          placeholder="Your Summary"
          value={summary}
          disabled={!enableSummary}
          onChange={setSummary}
        />
      </FormField>
      <FormField fieldTitle="Achievements">
        <input type="checkbox" checked={enableAchievements} onChange={(e) => setEnableAchievements(e.target.checked)} />
        <BulletListEditor
          items={achievements}
          setItems={setAchievements}
          disabled={!enableAchievements}
          placeholderPrefix="Achievement"
        />
      </FormField>
      <ExperienceEditor />
    </div>
  );
};

export default Editor;
