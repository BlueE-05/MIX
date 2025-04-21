// Column.tsx
'use client'; // Mantener si usas Next.js App Router
import React from 'react';
import Card from './Card'; // Importar el componente Card
import { Task } from './types'; // Importar desde el archivo de tipos
// Quitar import './Column.css'; si se maneja todo con Tailwind y KanbanBoard.css

interface ColumnProps {
  title: string;
  tasks: Task[];
  colorClass?: string;
  // Pasar los handlers unificados desde KanbanBoard
  onDragStart: (event: React.DragEvent<HTMLDivElement>, taskId: number, fromColumn: string) => void;
  onDragEnd: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>, toColumn: string) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
}

const Column: React.FC<ColumnProps> = ({
  title,
  tasks,
  colorClass,
  onDragStart,
  onDragEnd, // Recibir onDragEnd
  onDrop,
  onDragOver,
}) => {
  return (
    // Aplicar estilos de columna con Tailwind (o mantener clase .column si prefieres CSS)
    // Añadir un ancho fijo o flexible según necesites. Width de KanbanBoardCSS era 325px
    // Height era 50vh, overflow-y auto
    <div
      className= {`flex flex-col w-80 h-[70vh] p-4 rounded-lg flex-shrink-0 shadow-xl border ${colorClass}`} // Estilos Tailwind para la columna
      onDrop={(e) => onDrop(e, title)}
      onDragOver={onDragOver}
    >
      {/* Header de la columna */}
      <div className={`flex justify-between items-center mb-4 pb-2 border-b ${colorClass}`}>
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      </div>

      {/* Lista de tareas (permitiendo scroll) */}
      {/* Añadido overflow-y-auto y flex-grow para que las tarjetas ocupen el espacio y permitan scroll */}
      <div className="space-y-2 overflow-y-auto flex-grow">
        {tasks.length === 0 && (
            <p className="text-sm text-gray-500 text-center mt-4">There&apos;s not tasks...</p>
        )}
        {tasks.map(task => (
          <Card
            key={task.id}
            task={task}
            onDragStart={(e) => onDragStart(e, task.id, title)}
            onDragEnd={onDragEnd}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;