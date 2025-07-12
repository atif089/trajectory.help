import React from "react";

interface FormFieldProps {
  fieldTitle: string;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ fieldTitle, children }) => {
  return (
    <div className="editor_field__wrapper mb-4">
      <label className="block text-xs mb-2 font-medium text-gray-700">{fieldTitle}</label>
      {children}
    </div>
  );
};

export default FormField;
