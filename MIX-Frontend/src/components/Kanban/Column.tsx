'use client';
import React from 'react';
import Card from './Card';
import { Task } from '@/types/KanbanTypes';

interface ColumnProps {
  title: string;
  tasks: Task[];
  colorClass: string;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, id: number, from: string) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, to: string) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
}

const Column: React.FC<ColumnProps> = ({ title, tasks, colorClass, onDragStart, onDragEnd, onDrop, onDragOver }) => (
  <div
    className={`flex flex-col w-80 h-[70vh] p-4 rounded-lg flex-shrink-0 shadow-md border ${colorClass}`}
    onDrop={(e) => onDrop(e, title)}
    onDragOver={onDragOver}
  >
    <div className="flex justify-between items-center mb-4 pb-2 border-b">
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
    </div>

    <div className="space-y-2 overflow-y-auto flex-grow">
      {tasks.map(task => (
        <Card
          key={task.id}
          task={task}
          onDragStart={(e) => onDragStart(e, task.id, task.column)}
          onDragEnd={onDragEnd}
        />
      ))}
    </div>
  </div>
);

export default Column;