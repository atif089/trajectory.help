import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";

interface ReorderableSectionProps {
  id: string;
  children: React.ReactNode;
  title: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

const ReorderableSection: React.FC<ReorderableSectionProps> = ({ id, children, title, enabled, onToggle }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`border border-gray-200 rounded-lg p-4 mb-4 bg-white ${isDragging ? "shadow-lg" : "shadow-sm"}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 p-1"
            title="Drag to reorder"
          >
            <FontAwesomeIcon icon={faGripVertical} />
          </button>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        <div className="flex items-center">
          <input type="checkbox" checked={enabled} onChange={(e) => onToggle(e.target.checked)} className="mr-2" />
          <span className="text-sm text-gray-600">Enable Section</span>
        </div>
      </div>
      <div className={enabled ? "" : "opacity-50 pointer-events-none"}>{children}</div>
    </div>
  );
};

export default ReorderableSection;
