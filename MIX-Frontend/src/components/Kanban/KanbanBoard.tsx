// KanbanBoard.tsx
'use client';
import React, { useState, useCallback } from 'react';
import Column from './Column';
import { Task } from './types'; // Importar desde el archivo de tipos
// Asumiendo que los estilos del modal y el layout base están en KanbanBoard.css
// y que Tailwind se usa para el resto.
import './KanbanBoard.css'; 

const columnColors: { [key: string]: string } = {
  'Prospecting': 'bg-sky-300',
  'Initial Contact': 'bg-cyan-300',
  'Proposal': 'bg-teal-300',
  'Negotiation': 'bg-emerald-300',
  'Closing': 'bg-lime-300',
  'Cancelled': 'bg-red-300',
};

const initialColumns: { [key: string]: Task[] } = {
  'Prospecting': [
    { id: 1, ContactName: "Petunia", Enterprise: 'FEMSA', TotalProducts: 20 , TotalSale: 7 , TotalComission: 5 },
    { id: 2, ContactName: "Eduardo", Enterprise: 'Pepsico', TotalProducts: 20 , TotalSale: 7 , TotalComission: 5 }
  ],
  'Initial Contact': [
    { id: 3, ContactName: "Maximo", Enterprise: 'BMV', TotalProducts: 20 , TotalSale: 7 , TotalComission: 5 }
  ],
  'Proposal': [
    { id: 4, ContactName: "Dana", Enterprise: 'Ferrari', TotalProducts: 20 , TotalSale: 7 , TotalComission: 5 },
    { id: 5, ContactName: "MasterChief", Enterprise: 'Fresa', TotalProducts: 20 , TotalSale: 7 , TotalComission: 5 }
  ],
  'Negotiation': [
    { id: 6, ContactName: "Daniel", Enterprise: 'Bugati', TotalProducts: 20 , TotalSale: 7 , TotalComission: 5 },
    { id: 7, ContactName: "Estefania", Enterprise: 'Pepinillo', TotalProducts: 20 , TotalSale: 7 , TotalComission: 5 }
  ],  
  'Closing': [
    { id: 8, ContactName: "Sandino", Enterprise: 'Maseca', TotalProducts: 20 , TotalSale: 7 , TotalComission: 5 },
    { id: 9, ContactName: "Esteban", Enterprise: 'Hambre', TotalProducts: 20 , TotalSale: 7 , TotalComission: 5 }
  ],
  'Cancelled': [
    { id: 10, ContactName: "Fatima", Enterprise: 'Trebol', TotalProducts: 20 , TotalSale: 7 , TotalComission: 5 },
    { id: 11, ContactName: "Carlos", Enterprise: 'Comida', TotalProducts: 20 , TotalSale: 7 , TotalComission: 5 },
  ],
};

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<{ [key: string]: Task[] }>(initialColumns);
  const [selectedColumn, setSelectedColumn] = useState(Object.keys(initialColumns)[0] || ''); // Selecciona la primera columna por defecto

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
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Kanban Board</h1>
            <p className="text-gray-600">Drag and Drop your tasks!</p>
          </div>
          </div>
        </div>

        {/* Board Container (usando CSS para flex layout base) */}
        <div className="kanban-board rounded-xl p-4 sm:p-6 overflow-visible">
          {/* Usar grid aquí podría ser menos flexible para drag and drop entre listas largas,
              flexbox (como en KanbanBoard.css) podría ser más natural.
              Ajusta según tus preferencias visuales/funcionales.
              Si usas el CSS original, quita las clases de grid.
          */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-w-[800px]"> */}
          <div className="flex gap-6 min-w-[800px"> {/* Usando flex y gap */}
            {Object.keys(columns).map(columnName => (
              <Column
                key={columnName}
                title={columnName}
                tasks={columns[columnName]}
                colorClass={columnColors[columnName] ?? 'bg-white'}
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
  );
};

export default KanbanBoard;