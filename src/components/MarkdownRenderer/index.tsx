import React from "react";
import { marked } from "marked";
import { useEditorStore } from "@/store/editor.store";

import AchievementsSectionWrapper from "./AchievementsSectionWrapper";
import ExperienceSectionWrapper from "./ExperienceSectionWrapper";
import SummarySectionWrapper from "./SummarySectionWrapper";

function MarkdownRenderer() {
  const { personName, subTitleText, enableSummary, summary, enableAchievements, achievements, customBlocks, sectionOrder } =
    useEditorStore();

  const renderSection = (section: any) => {
    if (!section.enabled) return null;

    switch (section.type) {
      case "achievements":
        return (
          <AchievementsSectionWrapper 
            key={section.id}
            achievements={achievements} 
            enableAchievements={enableAchievements} 
          />
        );
      case "experiences":
        return <ExperienceSectionWrapper key={section.id} />;
      case "customBlock":
        const customBlock = customBlocks.find(block => block.id === section.customBlockId);
        if (!customBlock || !customBlock.enabled) return null;
        return (
          <section key={section.id} className="mb-4">
            <h2 className="text-[14pt] font-bold">{customBlock.title}</h2>
            <div className="mt-2" dangerouslySetInnerHTML={{ __html: marked.parse(customBlock.content) }}></div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="cv-preview w-full flex items-center justify-center my-4 ">
      <div className="a4-sim w-full max-w-[1200px] bg-white p-8 shadow-[5px_5px_5px_0_rgba(0,0,0,0.1)]">
        <section className="mb-4">
          <h1 className="text-[24pt] font-bold">{personName}</h1>
          <p className="text-[14pt]">{subTitleText}</p>
        </section>

        <hr className="my-4 border-black" />

        <SummarySectionWrapper enableSummary={enableSummary} summary={summary} />
        
        {sectionOrder.map(renderSection)}
      </div>
    </div>
  );
}

export default MarkdownRenderer;
