// KanbanBoard.tsx
'use client';
import React, { useState, useCallback } from 'react';
import Column from './Column';
import { Plus, CirclePlus, X } from "lucide-react";
import { Task } from './types'; // Importar desde el archivo de tipos
// Asumiendo que los estilos del modal y el layout base están en KanbanBoard.css
// y que Tailwind se usa para el resto.
import './KanbanBoard.css'; 

const initialColumns: { [key: string]: Task[] } = {
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
};

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<{ [key: string]: Task[] }>(initialColumns);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [selectedColumn, setSelectedColumn] = useState(Object.keys(initialColumns)[0] || ''); // Selecciona la primera columna por defecto
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);

  // Usar useCallback para optimizar las funciones pasadas como props
  const addTask = useCallback(() => {
    if (!newTaskTitle || !selectedColumn || !columns[selectedColumn]) return; // Añadir validación

    const newTask: Task = {
      id: Date.now(), // Usar timestamp es simple pero no ideal para IDs persistentes
      title: newTaskTitle,
      description: newTaskDescription,
    };

    setColumns(prevColumns => ({
      ...prevColumns,
      [selectedColumn]: [...prevColumns[selectedColumn], newTask],
    }));

    setNewTaskTitle('');
    setNewTaskDescription('');
    setIsTaskModalOpen(false);
  }, [newTaskTitle, newTaskDescription, selectedColumn, columns]);

  const addColumn = useCallback(() => {
    if (newColumnName && !columns[newColumnName]) {
      setColumns(prevColumns => ({
        ...prevColumns,
        [newColumnName]: []
      }));
      setNewColumnName('');
      setIsColumnModalOpen(false);
    }
  }, [newColumnName, columns]);

  const deleteColumn = useCallback((columnName: string) => {
    setColumns(prevColumns => {
      const newColumns = { ...prevColumns };
      delete newColumns[columnName];
      // Si la columna eliminada era la seleccionada en el modal, resetea la selección
      if (selectedColumn === columnName) {
         setSelectedColumn(Object.keys(newColumns)[0] || '');
      }
      return newColumns;
    });
  }, [selectedColumn]);

  const deleteTask = useCallback((columnName: string, taskId: number) => {
    setColumns(prevColumns => ({
      ...prevColumns,
      [columnName]: prevColumns[columnName].filter(task => task.id !== taskId),
    }));
  }, []);

  const handleDragStart = useCallback((event: React.DragEvent<HTMLDivElement>, taskId: number, fromColumn: string) => {
    event.dataTransfer.setData('taskId', taskId.toString());
    event.dataTransfer.setData('fromColumn', fromColumn);
    event.currentTarget.classList.add('dragging'); // Añadir clase al elemento arrastrado (Card)
  }, []);

  const handleDragEnd = useCallback((event: React.DragEvent<HTMLDivElement>) => {
     event.currentTarget.classList.remove('dragging'); // Limpiar clase
  }, []);


  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>, toColumn: string) => {
    event.preventDefault(); // Necesario para permitir el drop
    const taskId = parseInt(event.dataTransfer.getData('taskId'), 10);
    const fromColumn = event.dataTransfer.getData('fromColumn');

    if (!taskId || !fromColumn || !toColumn || fromColumn === toColumn || !columns[fromColumn] || !columns[toColumn]) {
        // Validar que toda la información necesaria está presente
        console.warn("Drop inválido - Faltan datos o columnas inválidas");
        return;
    }


    setColumns(prevColumns => {
        const taskToMove = prevColumns[fromColumn].find(task => task.id === taskId);
        if (!taskToMove) return prevColumns; // La tarea no se encontró (raro, pero seguro)

        const newColumns = { ...prevColumns };
        newColumns[fromColumn] = newColumns[fromColumn].filter(task => task.id !== taskId);
        newColumns[toColumn] = [...newColumns[toColumn], taskToMove];
        return newColumns;
    });
  }, [columns]); // Depende de columns para encontrar la tarea

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Necesario para permitir el drop
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Tablero Kanban</h1>
            <p className="text-gray-600">Arrastra y suelta para gestionar tus tareas</p>
          </div>
          <div className="flex flex-wrap gap-3">
             <button
              onClick={() => setIsTaskModalOpen(true)}
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

        {/* Board Container (usando CSS para flex layout base) */}
        <div className="kanban-board bg-white rounded-xl shadow-lg p-4 sm:p-6 overflow-x-auto">
          {/* Usar grid aquí podría ser menos flexible para drag and drop entre listas largas,
              flexbox (como en KanbanBoard.css) podría ser más natural.
              Ajusta según tus preferencias visuales/funcionales.
              Si usas el CSS original, quita las clases de grid.
          */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-w-[800px]"> */}
          <div className="flex gap-6 min-w-[800px]"> {/* Usando flex y gap */}
            {Object.keys(columns).map(columnName => (
              <Column
                key={columnName}
                title={columnName}
                tasks={columns[columnName]}
                deleteTask={deleteTask} // Pasar directamente
                onDeleteColumn={() => deleteColumn(columnName)}
                onDragStart={handleDragStart} // Pasar handlers unificados
                onDragEnd={handleDragEnd}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              />
            ))}
          </div>
        </div>
      </div>

       {/* Task Modal */}
      {isTaskModalOpen && (
        // Reutiliza tu estructura de modal actual o refactoriza si es necesario
        // Asegúrate de que los inputs y el select funcionen con los estados
        // y que los botones llamen a `addTask` y `setIsTaskModalOpen(false)`
        <div className="modal"> {/* Usando clase de KanbanBoardCSS.txt */}
           <div className="modal-content"> {/* Usando clase de KanbanBoardCSS.txt */}
             <div className="flex justify-between items-center mb-4">
               <h3 className="text-xl font-semibold text-gray-800">Nueva Tarea</h3>
               <button
                 onClick={() => setIsTaskModalOpen(false)}
                 className="text-gray-500 hover:text-gray-700"
                 aria-label="Cerrar modal de nueva tarea" // A11y
               >
                 <X className="w-6 h-6" />
               </button>
             </div>
            {/* Formulario (similar al original) */}
             <div className="space-y-4">
               <div>
                 <label htmlFor="task-title" className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                 <input
                   id="task-title"
                   type="text"
                   placeholder="Título de la tarea"
                   value={newTaskTitle}
                   onChange={(e) => setNewTaskTitle(e.target.value)}
                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                 />
               </div>
               <div>
                 <label htmlFor="task-description" className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                 <textarea
                   id="task-description"
                   placeholder="Descripción de la tarea"
                   value={newTaskDescription}
                   onChange={(e) => setNewTaskDescription(e.target.value)}
                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                   rows={3}
                 />
               </div>
               <div>
                <label htmlFor="task-column" className="block text-sm font-medium text-gray-700 mb-1">Columna</label>
                <select
                  id="task-column"
                  value={selectedColumn}
                  onChange={(e) => setSelectedColumn(e.target.value)}
                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                   // Deshabilitar si no hay columnas
                   disabled={Object.keys(columns).length === 0}
                >
                   {/* Opción por defecto si no hay columnas */}
                   {Object.keys(columns).length === 0 && <option>No hay columnas disponibles</option>}
                   {Object.keys(columns).map(col => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
              </div>
             </div>
             <div className="mt-6 flex justify-end space-x-3">
               <button
                 onClick={() => setIsTaskModalOpen(false)}
                 className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
               >
                 Cancelar
               </button>
               <button
                 onClick={addTask}
                 disabled={!newTaskTitle || !selectedColumn || Object.keys(columns).length === 0} // Deshabilitar si no hay título o columna seleccionable
                 className={`px-4 py-2 rounded-lg text-white ${(!newTaskTitle || !selectedColumn || Object.keys(columns).length === 0) ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
               >
                 Agregar Tarea
               </button>
             </div>
           </div>
         </div>
      )}

       {/* Column Modal */}
       {isColumnModalOpen && (
         // Reutiliza tu estructura de modal actual
         // Asegúrate de que los botones llamen a `addColumn` y `setIsColumnModalOpen(false)`
         <div className="modal"> {/* Usando clase de KanbanBoardCSS.txt */}
           <div className="modal-content"> {/* Usando clase de KanbanBoardCSS.txt */}
               <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Nueva Columna</h3>
                <button
                    onClick={() => setIsColumnModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Cerrar modal de nueva columna" // A11y
                >
                    <X className="w-6 h-6" />
                </button>
                </div>
                <div className="space-y-4">
                <div>
                    <label htmlFor="column-name" className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Columna</label>
                    <input
                    id="column-name"
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
                    disabled={!newColumnName || !!columns[newColumnName]} // Deshabilitar si está vacío o el nombre ya existe
                    className={`px-4 py-2 rounded-lg text-white ${(!newColumnName || !!columns[newColumnName]) ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
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