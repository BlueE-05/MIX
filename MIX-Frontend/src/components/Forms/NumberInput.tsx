import React, { useState } from 'react';
import { NumberInputProps } from '@/types/NumberInput';

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
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        
        // Validación para no superar el valor máximo
        if (max && newValue > max) {
            setError(`El valor no puede ser mayor que ${max}`);
        } else {
            setError(null); // Resetear el error si el valor es válido
            onChange(newValue);
        }
    };

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
                onChange={handleChange}
                className={`w-full px-4 py-2 text-sm border ${error ? 'border-red-600' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900`}
                required={required}
            />
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        </div>
    );
}
