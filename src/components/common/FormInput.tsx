import React from "react";

interface FormInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  type?: "text" | "textarea";
}

const FormInput: React.FC<FormInputProps> = ({
  placeholder,
  value,
  onChange,
  className = "w-full p-2 mb-2",
  disabled = false,
  type = "text",
}) => {
  if (type === "textarea") {
    return (
      <textarea
        className={`resize-y ${className}`}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
  
  return (
    <input
      type="text"
      className={className}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default FormInput;
