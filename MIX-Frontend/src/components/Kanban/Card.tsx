// Card.tsx
import React from 'react';
import { Task } from './types'; // Import from types file
// Remove import './Card.css'; if everything is handled with Tailwind

interface CardProps {
  task: Task; // Receive the complete task object
  // onDelete: () => void; // Remove onDelete prop
  // Receive necessary handlers to make the div draggable
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: (event: React.DragEvent<HTMLDivElement>) => void;
}

const Card: React.FC<CardProps> = ({ task, onDragStart, onDragEnd }) => {
  const { ContactName, Enterprise, TotalProducts, TotalSale, TotalComission } = task;

  return (
    <div
      className="relative bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 group"
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      {/* Card content */}
      <div className="flex justify-between items-start mb-1">
        <div>
          <h3 className="font-medium text-gray-800 break-words mr-6">{Enterprise}</h3>
          {ContactName && (

            <p className="text-sm text-gray-600">Contact: {ContactName}</p>
          )}
        </div>

      </div>

      <div className="grid grid-cols-2 gap-2 mt-3">
        <div>
          <p className="text-sm font-medium text-gray-500">Products</p>
          <p className="text-sm text-gray-800">{TotalProducts}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Sales</p>
          <p className="text-sm text-gray-800">{TotalSale}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Commission</p>
          <p className="text-sm text-gray-800">{TotalComission}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;