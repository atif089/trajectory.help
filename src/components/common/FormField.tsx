import React from "react";

interface FormFieldProps {
  fieldTitle: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  type?: "text" | "textarea";
  children?: React.ReactNode;
  showWordCount?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  fieldTitle,
  placeholder,
  value,
  onChange,
  className = "w-full p-2",
  disabled = false,
  type = "text",
  children,
  showWordCount = false,
}) => {
  const inputElement =
    type === "textarea" ? (
      <textarea
        className={`resize-y block ${className}`}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      />
    ) : (
      <input
        type="text"
        className={className}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      />
    );

  // TODO: These are not accurate for markdown text
  const chars = typeof value === "string" ? value.length : 0;
  const words = typeof value === "string" ? value.split(" ").length : 0;

  const indicator_rule_engine = {
    green: {
      words: 30,
      chars: 200,
    },
    yellow: {
      words: 60,
      chars: 600,
    },
  };

  const indicatorBgClass =
    words <= indicator_rule_engine.green.words && chars <= indicator_rule_engine.green.chars
      ? "bg-green-200"
      : words <= indicator_rule_engine.yellow.words && chars <= indicator_rule_engine.yellow.chars
        ? "bg-yellow-200"
        : "bg-red-200";

  return (
    <div className="editor_field__wrapper my-4 border-gray-200 rounded relative">
      {children}
      <label className="block text-xs font-medium text-gray-700 absolute top-[-12px] left-2 bg-white px-2">
        {fieldTitle}
      </label>
      {inputElement}

      {showWordCount && (
        <div className="flex justify-between bottom-2 right-2 absolute">
          <span
            title={`${words} words (${chars} chars)`}
            className={indicatorBgClass + " p-[3px] text-xs font-bold chars"}
          >
            {words}w ({chars}c)
          </span>
        </div>
      )}
    </div>
  );
};

export default FormField;
