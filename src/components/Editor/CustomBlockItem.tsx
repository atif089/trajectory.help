import React from "react";
import { CustomBlock } from "@/store/editor.store";
import FormField from "../common/FormField";
import { Button } from "@/components/common/Button";

interface CustomBlockItemProps {
  block: CustomBlock;
  onUpdate: (id: string, updates: Partial<Omit<CustomBlock, "id">>) => void;
  onRemove: (id: string) => void;
  hideToggle?: boolean; // Hide the enable/disable toggle when used in reorderable sections
}

const CustomBlockItem: React.FC<CustomBlockItemProps> = ({ block, onUpdate, onRemove, hideToggle = false }) => {
  return (
    <div className={hideToggle ? "" : "mb-6 p-4 border border-gray-200 rounded-md"}>
      <div className="flex justify-end mb-2">
        <Button onClick={() => onRemove(block.id)} size="sm" variant="delete">
          Remove Section
        </Button>
      </div>

      <FormField
        fieldTitle="Section Title"
        placeholder="Section Title"
        value={block.title}
        onChange={(value) => onUpdate(block.id, { title: value })}
      />

      <FormField
        fieldTitle="Section Content"
        type="textarea"
        showWordCount={true}
        placeholder="Section Content"
        value={block.content}
        onChange={(value) => onUpdate(block.id, { content: value })}
      />
    </div>
  );
};

export default CustomBlockItem;
