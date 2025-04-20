// components/CustomTable.js
'use client'
import { Search } from 'lucide-react';
import { useState } from 'react';

interface CustomTableProps {
    headers: string[];
    data: React.ReactNode[][];
    color?: string;
    includeSearch?: boolean;
    onSearch?: (searchTerm: string) => void; // Nueva prop para manejar búsqueda
}

const CustomTable = ({ 
    headers, 
    data, 
    color = "#FFFFFF", 
    includeSearch = true, 
    onSearch 
}: CustomTableProps) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && onSearch) {
            onSearch(searchTerm);
        }
    };

    return (
        <div className="flex flex-col w-full">
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full py-2">
                    <div className="overflow-hidden">
                        {/** Buscador **/}
                        <div style={{ backgroundColor: color }} className="rounded-t-md h-14 flex items-center p-4 relative">
                            {includeSearch && (
                                <>
                                    <input 
                                        placeholder="Search" 
                                        className="w-xl rounded-full py-1 px-10 focus:outline-none focus:ring-2 focus:ring-stone-900 bg-gray-100"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onKeyDown={handleSearch}
                                    />
                                    <Search 
                                        className="absolute left-6 h-5 w-5 text-black cursor-pointer" 
                                        onClick={() => onSearch && onSearch(searchTerm)}
                                    />
                                </>
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