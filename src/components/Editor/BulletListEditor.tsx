import React from "react";

interface BulletListEditorProps {
  items: string[];
  setItems: (items: string[]) => void;
  disabled?: boolean;
  placeholderPrefix?: string;
}

/**
 * Generic editor for a list of bullet points. Re-usable for Achievements, Experience bullets, etc.
 *
 * Props:
 *  - items: current array of strings
 *  - setItems: callback to update array
 *  - disabled: optional, when true all inputs are disabled
 *  - placeholderPrefix: optional prefix for placeholder label (default "Bullet")
 */
const BulletListEditor: React.FC<BulletListEditorProps> = ({
  items,
  setItems,
  disabled = false,
  placeholderPrefix = "Bullet",
}) => {
  const handleChange = (idx: number, value: string) => {
    const updated = items.map((it, i) => (i === idx ? value : it));
    setItems(updated);
  };

  const handleAdd = () => {
    setItems([...items, ""]);
  };

  const handleRemove = (idx: number) => {
    if (items.length === 1) return; // keep at least 1 field
    const updated = items.filter((_, i) => i !== idx);
    setItems(updated);
  };

  return (
    <div className="flex flex-col gap-1">
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-2 items-center">
          <input
            type="text"
            className="flex-1 p-2 border rounded"
            placeholder={`${placeholderPrefix} ${idx + 1}`}
            value={item}
            disabled={disabled}
            onChange={(e) => handleChange(idx, e.target.value)}
          />
          {!disabled && (
            <button
              type="button"
              className="px-2 py-1 text-white bg-red-500 rounded"
              onClick={() => handleRemove(idx)}
            >
              –
            </button>
          )}
        </div>
      ))}
      {!disabled && (
        <button
          type="button"
          className="mt-1 w-max px-3 py-1 text-sm text-white bg-blue-500 rounded"
          onClick={handleAdd}
        >
          + Add
        </button>
      )}
    </div>
  );
};

export default BulletListEditor;
