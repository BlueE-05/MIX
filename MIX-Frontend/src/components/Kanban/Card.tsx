// Card.tsx
import React from 'react';
import { X } from 'lucide-react';
import { Task } from './types'; // Importar desde el archivo de tipos
// Quitar import './Card.css'; si se maneja todo con Tailwind

interface CardProps {
  task: Task; // Recibir el objeto task completo
  onDelete: () => void;
  // Recibir los handlers necesarios para hacer el div draggable
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: (event: React.DragEvent<HTMLDivElement>) => void;
}

const Card: React.FC<CardProps> = ({ task, onDelete, onDragStart, onDragEnd }) => {
  const { title, description } = task;

  return (
    <div
      // Aplicar estilos de card con Tailwind (o mantener clase .card si prefieres CSS)
      className="relative bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 group card-base" // Añadida clase 'card-base' por si necesitas estilos CSS específicos para el estado :hover o :dragging
      draggable // Hacer este div el elemento arrastrable
      onDragStart={onDragStart} // Usar el handler pasado desde KanbanBoard via Column
      onDragEnd={onDragEnd} // Usar el handler pasado desde KanbanBoard via Column
    >
      {/* Contenido de la tarjeta */}
      <div className="flex justify-between items-start mb-1">
        <h3 className="font-medium text-gray-800 break-words mr-6">{title}</h3> {/* mr-6 para espacio para el botón */}
        <button
          onClick={onDelete}
          // Hacer el botón más visible o mostrarlo al hacer hover sobre la tarjeta
          className="absolute top-1 right-1 p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-100 rounded-full text-gray-400 hover:text-red-500 transition-opacity"
          aria-label={`Eliminar tarea ${title}`} // A11y
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {description && (
        <p className="text-sm text-gray-600 mt-1 break-words">{description}</p>
      )}
    </div>
  );
};

export default Card;