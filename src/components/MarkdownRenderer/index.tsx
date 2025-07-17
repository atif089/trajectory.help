import React from "react";
import { marked } from "marked";
import { useEditorStore } from "@/store/editor.store";
import ExperienceSectionWrapper from "./ExperienceSectionWrapper";

function MarkdownRenderer() {
  const { personName, subTitleText, enableSummary, summary, enableAchievements, achievements, customBlocks } = useEditorStore();

  return (
    <div className="cv-preview w-full flex items-center justify-center my-4 ">
      <div className="a4-sim w-full max-w-[1200px] bg-white p-8 shadow-[5px_5px_5px_0_rgba(0,0,0,0.1)]">
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
              <div className="mt-2" dangerouslySetInnerHTML={{ __html: marked.parse(achievements) }}></div>
            )}
          </section>
        )}
        <ExperienceSectionWrapper />
        
        {customBlocks.map(block => (
          block.enabled && (
            <section key={block.id} className="mb-4">
              <h2 className="text-[14pt] font-bold">{block.title}</h2>
              <div className="mt-2" dangerouslySetInnerHTML={{ __html: marked.parse(block.content) }}></div>
            </section>
          )
        ))}
      </div>
    </div>
  );
}

export default MarkdownRenderer;
