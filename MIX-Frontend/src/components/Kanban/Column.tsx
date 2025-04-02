'use client';
import React from 'react';
import { X } from 'lucide-react';
import './Column.css'; // Importa el archivo CSS

interface Task {
  id: number;
  title: string;
  description?: string;
}

interface ColumnProps {
  title: string;
  tasks: Task[];
  deleteTask: (column: string, taskId: number) => void;
  onDeleteColumn: () => void;
  onDragStart: (event: React.DragEvent<HTMLDivElement>, taskId: number, fromColumn: string) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>, toColumn: string) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
}

const Column: React.FC<ColumnProps> = ({
  title,
  tasks,
  deleteTask,
  onDeleteColumn,
  onDragStart,
  onDrop,
  onDragOver
}) => {
  return (
    <div
      className="bg-gray-100 p-4 rounded-lg"
      onDrop={(e) => onDrop(e, title)}
      onDragOver={onDragOver}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        <button 
          onClick={onDeleteColumn}
          className="p-1 hover:bg-gray-200 rounded-full"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>
      
      <div className="space-y-2">
        {tasks.map(task => (
          <div
            key={task.id}
            draggable
            onDragStart={(e) => onDragStart(e, task.id, title)}
            className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-gray-800">{task.title}</h3>
              <button
                onClick={() => deleteTask(title, task.id)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            {task.description && (
              <p className="text-sm text-gray-600 mt-1">{task.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Column;
