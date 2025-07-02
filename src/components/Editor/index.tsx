import React from "react";

import { useEditorStore } from "@/store/editor.store";

const FormField = ({ fieldTitle, children }: { fieldTitle: string; children: React.ReactNode }) => {
  return (
    <div className="editor_field__wrapper mb-4">
      <label className="block text-xs mb-2 font-medium text-gray-700">{fieldTitle}</label>
      {children}
    </div>
  );
};

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
      className="w-full max-w-md my-4 p-4 rounded-lg bg-white border shadow-lg border-gray-200"
      style={{ maxWidth: "800px" }}
    >
      <h1 className="text-3xl font-bold mb-8">{editorTitle}</h1>

      <FormField fieldTitle="Name">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-2 mb-2"
          value={personName}
          onChange={(e) => {
            setPersonName(e.target.value);
          }}
        />
      </FormField>
      <FormField fieldTitle="Subtitle">
        <input
          type="text"
          placeholder="Your Subtitle"
          className="w-full p-2 mb-2"
          value={subTitleText}
          onChange={(e) => {
            setSubTitleText(e.target.value);
          }}
        />
      </FormField>
      <FormField fieldTitle="Summary">
        <input type="checkbox" checked={enableSummary} onChange={(e) => setEnableSummary(e.target.checked)} />
        <textarea
          placeholder="Your Summary"
          className="w-full p-2 mb-2 resize-y"
          value={summary}
          disabled={!enableSummary}
          onChange={(e) => {
            setSummary(e.target.value);
          }}
        />
      </FormField>
      <FormField fieldTitle="Achievements">
        <input type="checkbox" checked={enableAchievements} onChange={(e) => setEnableAchievements(e.target.checked)} />
        {achievements.map((achievement, index) => (
          <input
            type="text"
            placeholder="Your Subtitle"
            className="w-full p-2 mb-2"
            key={`field-achievement-${index}`}
            value={achievement}
            disabled={!enableAchievements}
            onChange={(e) => {
              const newAchievements = [...achievements];
              newAchievements[index] = e.target.value;
              setAchievements(newAchievements);
            }}
          />
        ))}
      </FormField>
    </div>
  );
};

export default Editor;
