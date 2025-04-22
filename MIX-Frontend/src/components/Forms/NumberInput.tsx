import React from 'react';

interface NumberInputProps {
    label: string;
    name: string;
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    required?: boolean;
}

export default function NumberInput({
    label,
    name,
    value,
    onChange,
    min,
    max,
    step,
    required = false
}: NumberInputProps) {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-bold text-gray-700 mb-2">
                {label}
                {required && <span className="text-red-600">*</span>}
            </label>
            <input
                id={name}
                name={name}
                type="number"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900"
                required={required}
            />
        </div>
    );
}