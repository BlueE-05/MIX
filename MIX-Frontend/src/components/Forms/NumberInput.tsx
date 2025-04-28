<<<<<<< HEAD
import React, { useState } from 'react';
import { NumberInputProps } from '@/types/NumberInput';
=======
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
>>>>>>> origin/pruebanewmerge_sales_report

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
<<<<<<< HEAD
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

=======
>>>>>>> origin/pruebanewmerge_sales_report
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
<<<<<<< HEAD
                onChange={handleChange}
                className={`w-full px-4 py-2 text-sm border ${error ? 'border-red-600' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900`}
                required={required}
            />
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        </div>
    );
}
=======
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900"
                required={required}
            />
        </div>
    );
}
>>>>>>> origin/pruebanewmerge_sales_report
