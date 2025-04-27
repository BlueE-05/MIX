// components/CustomTable.tsx
'use client'
import { Search } from 'lucide-react';
import { ChangeEvent } from 'react';

interface CustomTableProps {
    headers: string[];
    data: React.ReactNode[][]; // Permite cualquier tipo de dato en las celdas
    color?: string;
    includeSearch?: boolean;
    onSearch?: (searchTerm: string) => void; // Nueva prop para manejar la búsqueda
}

const CustomTable = ({ headers, data, color = "#FFFFFF", includeSearch = true, onSearch }: CustomTableProps) => {
    
    // Función para manejar el cambio en el input de búsqueda
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (onSearch) {
            onSearch(e.target.value);
        }
    };

    return (
        <div className="flex flex-col w-full">
            <div className="overflow-visible">
                <div className="inline-block min-w-full py-2">
                    <div className="overflow-hidden">
                        {/** Buscador **/}
                        <div style={{ backgroundColor: color }} className="rounded-t-md h-14 flex items-center p-4">
                            {includeSearch && (
                                <div className="flex items-center flex-1 bg-gray-100 rounded-full pl-3 pr-4 max-w-xs focus-within:ring-2 focus-within:ring-stone-900">
                                    <Search className="h-5 w-5 text-black mr-2" />
                                    <input 
                                        placeholder="Search" 
                                        className="w-full py-1 bg-transparent focus:outline-none" 
                                        onChange={handleSearchChange}
                                    />
                                </div>
                            )}
                        </div>

                        <table className="min-w-full text-left text-sm rounded-md bg-white">
                            <thead className="border-b-4 border-neutral-200 font-bold">
                                <tr>
                                    {headers.map((header, index) => (
                                        <th key={index} scope="col" className="px-6 py-4">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, index) => (
                                    <tr key={index} className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-200">
                                        {row.map((cell, cellIndex) => (
                                            <td key={cellIndex} className="px-6 py-4">
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomTable;