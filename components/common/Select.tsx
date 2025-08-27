
import React from 'react';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
}

export const Select: React.FC<SelectProps> = ({ label, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium text-gray-400">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-800 border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md text-white"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);