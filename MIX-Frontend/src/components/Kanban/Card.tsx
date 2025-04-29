'use client';
import React from 'react';
import { Task } from '@/types/KanbanTypes';

interface CardProps {
  task: Task;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
}

const Card: React.FC<CardProps> = ({ task, onDragStart, onDragEnd }) => (
  <div
    className="relative bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
    draggable
    onDragStart={onDragStart}
    onDragEnd={onDragEnd}
  >
    <h3 className="text-base font-semibold text-gray-800 truncate">{task.Enterprise ?? 'No Company'} #{task.id}</h3>

    <div className="bg-gray-50 rounded-md p-3 mt-3 text-sm space-y-1">
      <div className="flex justify-between"><span>Sales</span><span>${task.TotalSale?.toFixed(2) ?? '0.00'}</span></div>
      <div className="flex justify-between"><span>Creation Date</span><span>{new Date(task.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}</span></div>
    </div>
  </div>
);

export default Card;
