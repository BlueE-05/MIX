'use client';
import React, { useState } from 'react';
import Column from './Column';
import { Plus, CirclePlus, X } from "lucide-react";
import './KanbanBoard.css';

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

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({
    'Prospectos': [
      { id: 1, title: 'Contactar a cliente potencial', description: 'Enviar correo electrónico de presentación' },
      { id: 2, title: 'Llamada de seguimiento', description: 'Llamar para dar seguimiento a correo enviado' },
    ],
    'Cotización': [
      { id: 3, title: 'Preparar cotización', description: 'Crear cotización para cliente potencial' },
    ],
    'Cierre': [
      { id: 4, title: 'Negociar términos', description: 'Negociar términos y condiciones del contrato' },
      { id: 5, title: 'Cerrar venta', description: 'Finalizar y firmar contrato con el cliente' },
    ],
  });

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('Prospectos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);

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

  const addColumn = () => {
    if (newColumnName && !tasks[newColumnName]) {
      setTasks({
        ...tasks,
        [newColumnName]: []
      });
      setNewColumnName('');
      setIsColumnModalOpen(false);
    }
  };

  const deleteColumn = (columnName: string) => {
    const newTasks = { ...tasks };
    delete newTasks[columnName];
    setTasks(newTasks);
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

    if (fromColumn === toColumn) return;

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-6">
      <div className="max-w-full mx-auto">
        {/* Header with controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Tablero Kanban</h1>
            <p className="text-gray-600">Arrastra y suelta para gestionar tus tareas</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
            >
              <Plus className="h-4 w-4" />
              <span>Nueva Tarea</span>
            </button>
            
            <button 
              onClick={() => setIsColumnModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
            >
              <CirclePlus className="h-4 w-4" />
              <span>Nueva Columna</span>
            </button>
          </div>
        </div>

        {/* Kanban Board Container */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 overflow-x-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-w-[800px]">
            {Object.keys(tasks).map(column => (
              <Column
                key={column}
                title={column}
                tasks={tasks[column]}
                deleteTask={deleteTask}
                onDragStart={onDragStart}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDeleteColumn={() => deleteColumn(column)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Nueva Tarea</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <input
                  type="text"
                  placeholder="Título de la tarea"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  placeholder="Descripción de la tarea"
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Columna</label>
                <select 
                  value={selectedColumn} 
                  onChange={(e) => setSelectedColumn(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  {Object.keys(tasks).map(column => (
                    <option key={column} value={column}>{column}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button 
                onClick={addTask}
                disabled={!newTaskTitle}
                className={`px-4 py-2 rounded-lg text-white ${!newTaskTitle ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                Agregar Tarea
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Column Modal */}
      {isColumnModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Nueva Columna</h3>
              <button 
                onClick={() => setIsColumnModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Columna</label>
                <input
                  type="text"
                  placeholder="Nombre de la columna"
                  value={newColumnName}
                  onChange={(e) => setNewColumnName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setIsColumnModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button 
                onClick={addColumn}
                disabled={!newColumnName}
                className={`px-4 py-2 rounded-lg text-white ${!newColumnName ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
              >
                Agregar Columna
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;