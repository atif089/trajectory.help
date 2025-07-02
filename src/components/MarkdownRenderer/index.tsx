import React from "react";
import { useEditorStore } from "@/store/editor.store";

function MarkdownRenderer() {
  const { personName, subTitleText, enableSummary, summary, enableAchievements, achievements } = useEditorStore();

  return (
    <div className="a4-sim-wrapper w-full flex items-center justify-center my-4 ">
      <div className="a4-sim w-full max-w-[1200px] bg-white p-4 shadow-[5px_5px_5px_0_rgba(0,0,0,0.1)]">
        <section className="mb-4">
          <h1 className="text-[24pt] font-bold">{personName}</h1>
          <p className="text-[14pt]">{subTitleText}</p>
        </section>

        {enableSummary && (
          <section className="mb-4">
            <h2 className="text-[14pt] font-bold">Summary</h2>
            <p>{summary}</p>
          </section>
        )}

        {enableAchievements && (
          <section className="mb-4">
            <h2 className="text-[14pt] font-bold">Achievements</h2>

            {achievements && (
              <ul>
                {achievements.map((achievement, index) => (
                  <li key={`achievement-${index}`}>{achievement}</li>
                ))}
              </ul>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

export default MarkdownRenderer;
