import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import { useEditorStore } from "@/store/editor.store";
import FormField from "../common/FormField";
import ReorderableSection from "./ReorderableSection";

import CustomBlockItem from "./CustomBlockItem";
import ClientOnlyDndContext from "./ClientOnlyDndContext";
import { Button } from "@/components/common/Button";
import ExperienceEditor from "@/components/Editor/ExperienceEditor";

const Editor = () => {
  const {
    personName,
    subTitleText,
    enableSummary,
    summary,
    setPersonName,
    setSubTitleText,
    setEnableSummary,
    setSummary,
    sectionOrder,
    setSectionOrder,
    customBlocks,
    addCustomBlock,
    updateCustomBlock,
    removeCustomBlock,
  } = useEditorStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = sectionOrder.findIndex((item) => item.id === active.id);
      const newIndex = sectionOrder.findIndex((item) => item.id === over.id);

      setSectionOrder(arrayMove(sectionOrder, oldIndex, newIndex));
    }
  };

  const handleSectionToggle = (sectionId: string, enabled: boolean) => {
    const section = sectionOrder.find((s) => s.id === sectionId);
    const updatedOrder = sectionOrder.map((section) => (section.id === sectionId ? { ...section, enabled } : section));
    setSectionOrder(updatedOrder);

    // Update the specific enable state in the store
    if (section?.type === "customBlock" && section.customBlockId) {
      updateCustomBlock(section.customBlockId, { enabled });
    }
  };

  const getSectionTitle = (section: any): string => {
    switch (section.type) {
      case "experiences":
        return "Experiences";
      case "customBlock":
        const customBlock = customBlocks.find((block) => block.id === section.customBlockId);
        return customBlock?.title || "Custom Block";
      default:
        return "";
    }
  };

  const renderSectionContent = (section: any) => {
    switch (section.type) {
      case "experiences":
        return <ExperienceEditor />;
      case "customBlock":
        const customBlock = customBlocks.find((block) => block.id === section.customBlockId);
        return customBlock ? (
          <CustomBlockItem
            block={customBlock}
            onUpdate={updateCustomBlock}
            onRemove={removeCustomBlock}
            hideToggle={true}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div>
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

      <div className="mt-6">
        <div className="grid grid-cols-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Sections</h2>
          <p className="justify-self-end text-sm text-gray-600 mb-4">Drag sections to reorder them in your resume</p>
        </div>

        <ClientOnlyDndContext items={sectionOrder.map((section) => section.id)} onDragEnd={handleDragEnd}>
          {sectionOrder.map((section) => (
            <ReorderableSection
              key={section.id}
              id={section.id}
              title={getSectionTitle(section)}
              enabled={section.enabled}
              onToggle={(enabled) => handleSectionToggle(section.id, enabled)}
            >
              {renderSectionContent(section)}
            </ReorderableSection>
          ))}
        </ClientOnlyDndContext>

        <div className="mt-4">
          <Button onClick={addCustomBlock}>+ Add Section</Button>
        </div>
      </div>
    </div>
  );
};

export default Editor;
