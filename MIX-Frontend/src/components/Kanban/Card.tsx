// Card.tsx
import React from 'react';
import { Task } from './types'; // Importar desde el archivo de tipos
// Quitar import './Card.css'; si se maneja todo con Tailwind

interface CardProps {
  task: Task; // Recibir el objeto task completo
  // onDelete: () => void; // Eliminar la prop onDelete
  // Recibir los handlers necesarios para hacer el div draggable
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
      {/* Contenido de la tarjeta */}
      <div className="flex justify-between items-start mb-1">
        <div>
          <h3 className="font-medium text-gray-800 break-words mr-6">{Enterprise}</h3>
          {ContactName && (
            <p className="text-sm text-gray-600">Contacto: {ContactName}</p>
          )}
        </div>
        {/* Quitar el botón de eliminar */}
        {/* <button
          onClick={onDelete}
          className="absolute top-1 right-1 p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-100 rounded-full text-gray-400 hover:text-red-500 transition-opacity"
          aria-label={`Eliminar ${Enterprise}`}
        >
          <X className="w-4 h-4" />
        </button> */}
      </div>

      <div className="grid grid-cols-2 gap-2 mt-3">
        <div>
          <p className="text-sm font-medium text-gray-500">Productos</p>
          <p className="text-sm text-gray-800">{TotalProducts}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Ventas</p>
          <p className="text-sm text-gray-800">{TotalSale}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Comisión</p>
          <p className="text-sm text-gray-800">{TotalComission}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;