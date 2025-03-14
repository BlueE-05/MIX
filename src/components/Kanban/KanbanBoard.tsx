'use client';
import React, { useState } from 'react';
import Column from './Column';
import './KanbanBoard.css'; // Importa el archivo CSS

interface Task {
  id: number;
  title: string;
  description?: string;
}

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({
    'Proyección': [
      { id: 1, title: 'Investigar Kanban', description: 'Leer documentación sobre Kanban' },
      { id: 2, title: 'Diseñar UI', description: 'Crear wireframe en Figma' },
    ],
    'Cotización': [
      { id: 3, title: 'Implementar arrastrar y soltar', description: 'Agregar drag & drop con react-dnd' },
    ],
    'Reunión': [
      { id: 4, title: 'Optimizar rendimiento', description: 'Reducir renders innecesarios en componentes' },
    ],
  });

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('Por hacer');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addTask = () => {
    const newTask: Task = {
      id: Date.now(),
      title: newTaskTitle,
      description: newTaskDescription,
    };
    setTasks({
      ...tasks,
      [selectedColumn]: [...tasks[selectedColumn], newTask],
    });
    setNewTaskTitle('');
    setNewTaskDescription('');
    setIsModalOpen(false);
  };

  const deleteTask = (column: string, taskId: number) => {
    setTasks({
      ...tasks,
      [column]: tasks[column].filter(task => task.id !== taskId),
    });
  };

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, taskId: number, fromColumn: string) => {
    event.dataTransfer.setData('taskId', taskId.toString());
    event.dataTransfer.setData('fromColumn', fromColumn);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>, toColumn: string) => {
    const taskId = parseInt(event.dataTransfer.getData('taskId'), 10);
    const fromColumn = event.dataTransfer.getData('fromColumn');

    if (fromColumn === toColumn) {
      return; // No hacer nada si se suelta en la misma columna
    }

    const task = tasks[fromColumn].find(task => task.id === taskId);
    if (task) {
      setTasks({
        ...tasks,
        [fromColumn]: tasks[fromColumn].filter(task => task.id !== taskId),
        [toColumn]: [...tasks[toColumn], task],
      });
    }
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <button className="open-modal-button" onClick={() => setIsModalOpen(true)}>Agregar nueva tarea</button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Agregar nueva tarea</h3>
            <input
              type="text"
              placeholder="Título"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Descripción"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
            />
            <select value={selectedColumn} onChange={(e) => setSelectedColumn(e.target.value)}>
              {Object.keys(tasks).map(column => (
                <option key={column} value={column}>{column}</option>
              ))}
            </select>
            <button onClick={addTask}>Agregar tarea</button>
            <button onClick={() => setIsModalOpen(false)}>Cerrar</button>
          </div>
        </div>
      )}
      <div className="kanban-board">
        {Object.keys(tasks).map(column => (
          <Column
            key={column}
            title={column}
            tasks={tasks[column]}
            deleteTask={deleteTask}
            onDragStart={onDragStart}
            onDrop={onDrop}
            onDragOver={onDragOver}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;