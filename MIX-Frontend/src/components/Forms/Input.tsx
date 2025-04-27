import React, { ChangeEvent } from "react";

interface InputProps {
  label: string;
  name: string;
  type: string;
  value: string;
  max_lenght?: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type,
  value,
  max_lenght,
  onChange,
  required = false,
  disabled = false,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-bold text-gray-700 mb-2">
        {label}
        {required && <span className="font-bold text-md text-red-600">*</span>}
      </label>
      <input type={type} name={name} value={value} maxLength={max_lenght} onChange={onChange} required={required} disabled={disabled}
        className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900"/>
      <div className="text-xs text-gray-500 text-right">
        {value.length}/{max_lenght}
      </div>
    </div>
  );
};

export default Input;