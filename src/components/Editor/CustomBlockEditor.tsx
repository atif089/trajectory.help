import React from "react";
import { useEditorStore, CustomBlock } from "@/store/editor.store";
import FormField from "../common/FormField";

interface CustomBlockItemProps {
  block: CustomBlock;
  onUpdate: (id: string, updates: Partial<Omit<CustomBlock, 'id'>>) => void;
  onRemove: (id: string) => void;
}

const CustomBlockItem: React.FC<CustomBlockItemProps> = ({ block, onUpdate, onRemove }) => {
  return (
    <div className="mb-6 p-4 border border-gray-200 rounded-md">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <input 
            type="checkbox" 
            checked={block.enabled} 
            onChange={(e) => onUpdate(block.id, { enabled: e.target.checked })} 
          />
          <span className="ml-2">Enable Block</span>
        </div>
        <button 
          onClick={() => onRemove(block.id)}
          className="text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div>
      
      <FormField
        fieldTitle="Block Title"
        placeholder="Block Title"
        value={block.title}
        disabled={!block.enabled}
        onChange={(value) => onUpdate(block.id, { title: value })}
      />
      
      <FormField
        fieldTitle="Block Content"
        type="textarea"
        showWordCount={true}
        placeholder="Block Content"
        value={block.content}
        disabled={!block.enabled}
        onChange={(value) => onUpdate(block.id, { content: value })}
      />
    </div>
  );
};

const CustomBlockEditor: React.FC = () => {
  const { customBlocks, addCustomBlock, updateCustomBlock, removeCustomBlock } = useEditorStore();

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4">Custom Blocks</h3>
      
      {customBlocks.map(block => (
        <CustomBlockItem 
          key={block.id} 
          block={block} 
          onUpdate={updateCustomBlock} 
          onRemove={removeCustomBlock} 
        />
      ))}
      
      <button 
        onClick={addCustomBlock}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Custom Block
      </button>
    </div>
  );
};

export default CustomBlockEditor;
