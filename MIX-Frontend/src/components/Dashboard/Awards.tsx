import React from 'react';

interface AwardsBoxProps {
  award?: string | null; // Definimos explícitamente el tipo
}

export default function AwardsBox({ award = null }: AwardsBoxProps) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md flex flex-col items-center justify-center">
      <div className="flex flex-col items-center h-full">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Awards</h2>
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="currentColor"
          className={`mb-2 ${award === null ? 'text-gray-400' : 'text-yellow-500'}`}
          viewBox="0 0 16 16"
        >
          <path d="m8 0 1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864z" />
          <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1z" />
        </svg>

        {award !== null ? (
          <p className="text-3xl font-bold text-yellow-600">
            {award.toLocaleString()}
          </p>
        ) : (
          <p className="text-gray-500">No awards yet</p>
        )}
      </div>
    </div>
  );
}