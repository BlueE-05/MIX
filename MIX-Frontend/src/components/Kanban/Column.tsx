'use client';
import React from 'react';
import Card from './Card';
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
  onDragStart: (event: React.DragEvent<HTMLDivElement>, taskId: number, fromColumn: string) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>, toColumn: string) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
}

const Column: React.FC<ColumnProps> = ({ title, tasks, deleteTask, onDragStart, onDrop, onDragOver }) => {
  return (
    <div className="column" onDrop={(event) => onDrop(event, title)} onDragOver={onDragOver}>
      <h2>{title}</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <Card
              //id={task.id}
              title={task.title}
              description={task.description}
              onDelete={() => deleteTask(title, task.id)}
              onDragStart={(event) => onDragStart(event, task.id, title)}
              onDragEnd={(event) => event.currentTarget.classList.remove('dragging')}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Column;
