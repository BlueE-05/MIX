import React from 'react';

export default function AwardsBox() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Awards</h2>
      <div className="flex flex-col items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          fill="currentColor"
          className="mb-2 text-yellow-500"
          viewBox="0 0 16 16"
        >
          <path d="m8 0 1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864z" />
          <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1z" />
        </svg>
        <p className="text-4xl font-bold text-yellow-600 text-shadow-md">50,000</p>
      </div>
    </div>
  );
}