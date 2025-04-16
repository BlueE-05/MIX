'use client';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import Column from './Column';
import { Task } from './types';
import './KanbanBoard.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [selectedColumn, setSelectedColumn] = useState(Object.keys(initialColumns)[0] || '');
  const [currentPage, setCurrentPage] = useState(0);
  const [visibleColumnsCount, setVisibleColumnsCount] = useState(3);
  const boardRef = useRef<HTMLDivElement>(null);

  // Calcular columnas visibles basado en el ancho del tablero
  useEffect(() => {
    const calculateVisibleColumns = () => {
      if (boardRef.current) {
        const boardWidth = boardRef.current.offsetWidth;
        // Asumimos un ancho aproximado de columna de 300px + gap
        const columnWidth = 300 + 24; // 24 es el gap (gap-6 = 1.5rem = 24px)
        const count = Math.max(1, Math.floor(boardWidth / columnWidth));
        setVisibleColumnsCount(count);
      }
    };

    calculateVisibleColumns();
    window.addEventListener('resize', calculateVisibleColumns);
    return () => window.removeEventListener('resize', calculateVisibleColumns);
  }, []);

  // Dividir las columnas en grupos según las columnas visibles
  const columnGroups = React.useMemo(() => {
    const columnNames = Object.keys(columns);
    const groups = [];
    for (let i = 0; i < columnNames.length; i += visibleColumnsCount) {
      groups.push(columnNames.slice(i, i + visibleColumnsCount));
    }
    return groups;
  }, [columns, visibleColumnsCount]);

  const visibleColumns = columnGroups[currentPage] || [];

  const goToNextPage = () => {
    if (currentPage < columnGroups.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

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
    <div className="min-h-screen p-4 sm:p-6 overflow-x-hidden">
      <div className="max-w-full mx-auto" ref={boardRef}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Kanban Board</h1>
            <p className="text-gray-600">Drag and Drop your tasks!</p>
          </div>
        </div>

        {/* Board Container con controles de paginación */}
        <div className="relative">
          {columnGroups.length > 1 && (
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={goToPrevPage}
                disabled={currentPage === 0}
                className={`p-2 rounded-full ${currentPage === 0 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-200'}`}
              >
                <ChevronLeft size={24} />
              </button>
              <span className="text-gray-600">
                Página {currentPage + 1} de {columnGroups.length}
              </span>
              <button 
                onClick={goToNextPage}
                disabled={currentPage === columnGroups.length - 1}
                className={`p-2 rounded-full ${currentPage === columnGroups.length - 1 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-200'}`}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}

          <div className="kanban-board-container overflow-x-auto pb-4">
            <div className="flex gap-6" style={{ minWidth: 'max-content' }}>
              {visibleColumns.map(columnName => (
                <Column
                  key={columnName}
                  title={columnName}
                  tasks={columns[columnName]}
                  colorClass={columnColors[columnName] ?? 'bg-white'}
                  deleteTask={deleteTask}
                  onDeleteColumn={() => deleteColumn(columnName)}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;