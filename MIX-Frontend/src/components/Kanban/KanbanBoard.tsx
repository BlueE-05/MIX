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
    { id: 1, ContactName: "Petunia", Enterprise: 'FEMSA', TotalProducts: 20, TotalSale: 7, TotalComission: 5 },
    { id: 2, ContactName: "Eduardo", Enterprise: 'Pepsico', TotalProducts: 20, TotalSale: 7, TotalComission: 5 }
  ],
  'Initial Contact': [
    { id: 3, ContactName: "Maximo", Enterprise: 'BMV', TotalProducts: 20, TotalSale: 7, TotalComission: 5 }
  ],
  'Proposal': [
    { id: 4, ContactName: "Dana", Enterprise: 'Ferrari', TotalProducts: 20, TotalSale: 7, TotalComission: 5 },
    { id: 5, ContactName: "MasterChief", Enterprise: 'Fresa', TotalProducts: 20, TotalSale: 7, TotalComission: 5 }
  ],
  'Negotiation': [
    { id: 6, ContactName: "Daniel", Enterprise: 'Bugati', TotalProducts: 20, TotalSale: 7, TotalComission: 5 },
    { id: 7, ContactName: "Estefania", Enterprise: 'Pepinillo', TotalProducts: 20, TotalSale: 7, TotalComission: 5 }
  ],
  'Closing': [
    { id: 8, ContactName: "Sandino", Enterprise: 'Maseca', TotalProducts: 20, TotalSale: 7, TotalComission: 5 },
    { id: 9, ContactName: "Esteban", Enterprise: 'Hambre', TotalProducts: 20, TotalSale: 7, TotalComission: 5 }
  ],
  'Cancelled': [
    { id: 10, ContactName: "Fatima", Enterprise: 'Trebol', TotalProducts: 20, TotalSale: 7, TotalComission: 5 },
    { id: 11, ContactName: "Carlos", Enterprise: 'Comida', TotalProducts: 20, TotalSale: 7, TotalComission: 5 },
  ],
};

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<{ [key: string]: Task[] }>(initialColumns);
  const [currentPage, setCurrentPage] = useState(0);
  const [visibleColumnsCount, setVisibleColumnsCount] = useState(3); // Define initial number of visible columns
  const boardRef = useRef<HTMLDivElement>(null);

  // Calculate visible columns based on board width
  useEffect(() => {
    const calculateVisibleColumns = () => {
      if (boardRef.current) {
        const boardWidth = boardRef.current.offsetWidth;
        // Assuming approximate column width of 300px + gap
        const columnWidth = 300 + 24; // 24 is the gap (gap-6 = 1.5rem = 24px)
        const count = Math.max(1, Math.floor(boardWidth / columnWidth));
        setVisibleColumnsCount(count);
      }
    };

    calculateVisibleColumns();
    window.addEventListener('resize', calculateVisibleColumns);
    return () => window.removeEventListener('resize', calculateVisibleColumns);
  }, []);

  const columnGroups = React.useMemo(() => {
    const columnNames = Object.keys(columns);
    const groups = [];
    
    const orderedColumns = [
      'Prospecting',
      'Initial Contact', 
      'Proposal',
      'Negotiation',
      'Closing',
      'Cancelled'
    ].filter(col => columnNames.includes(col));

    for (let i = 0; i < orderedColumns.length; i += visibleColumnsCount) {
      groups.push(orderedColumns.slice(i, i + visibleColumnsCount));
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

  const handleDragStart = useCallback((event: React.DragEvent<HTMLDivElement>, taskId: number, fromColumn: string) => {
    event.dataTransfer.setData('taskId', taskId.toString());
    event.dataTransfer.setData('fromColumn', fromColumn);
    event.currentTarget.classList.add('dragging'); // Add class to dragged element (Card)
  }, []);

  const handleDragEnd = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.currentTarget.classList.remove('dragging'); // Remove class
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>, toColumn: string) => {
    event.preventDefault(); // Necessary to allow drop
    const taskId = parseInt(event.dataTransfer.getData('taskId'), 10);
    const fromColumn = event.dataTransfer.getData('fromColumn');

    if (!taskId || !fromColumn || !toColumn || fromColumn === toColumn || !columns[fromColumn] || !columns[toColumn]) {
      // Validate all required information is present
      console.warn("Invalid drop - Missing data or invalid columns");
      return;
    }

    setColumns(prevColumns => {
      const taskToMove = prevColumns[fromColumn].find(task => task.id === taskId);
      if (!taskToMove) return prevColumns; // Task not found (rare but safe)

      const newColumns = { ...prevColumns };
      newColumns[fromColumn] = newColumns[fromColumn].filter(task => task.id !== taskId);
      newColumns[toColumn] = [...newColumns[toColumn], taskToMove];
      return newColumns;
    });
  }, [columns]); // Depends on columns to find the task

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Necessary to allow drop
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-full mx-auto" ref={boardRef}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Kanban Board</h1>
          </div>
        </div>

        {/* Board Container with pagination controls */}
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
                Page {currentPage + 1} of {columnGroups.length}
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

          <div className="overflow-x-auto">
            <div className="flex gap-6 min-w-max">
              {visibleColumns.map(columnName => (
                <Column
                  key={columnName}
                  title={columnName}
                  tasks={columns[columnName]}
                  colorClass={columnColors[columnName] ?? 'bg-white'}
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