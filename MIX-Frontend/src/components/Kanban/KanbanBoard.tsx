'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Column from './Column';
import { Task } from '@/types/KanbanTypes';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { updateKanbanCard } from '@/hooks/kanban/updateKanbanCard';
import { SaleFromAPI } from '@/hooks/kanban/useKanban';

interface KanbanBoardProps {
  data: Task[];
  originalDataMap: Map<number, SaleFromAPI>;
}

const columnColors: { [key: string]: string } = {
  'Prospecting': 'bg-sky-200',
  'Initial Contact': 'bg-cyan-200',
  'Proposal': 'bg-teal-200',
  'Negotiation': 'bg-emerald-200',
  'Closing': 'bg-lime-200',
  'Cancelled': 'bg-red-200',
};

const columnNameToNumber = (name: string): number => {
  switch (name) {
    case 'Prospecting': return 0;
    case 'Initial Contact': return 1;
    case 'Proposal': return 2;
    case 'Negotiation': return 3;
    case 'Closing': return 4;
    case 'Cancelled': return 5;
    default: return 0;
  }
};

const KanbanBoard: React.FC<KanbanBoardProps> = ({ data, originalDataMap }) => {
  const [columns, setColumns] = useState<{ [key: string]: Task[] }>({});
  const [currentPage, setCurrentPage] = useState(0);
  const [visibleColumnsCount, setVisibleColumnsCount] = useState(3);
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grouped: { [key: string]: Task[] } = {
      'Prospecting': [],
      'Initial Contact': [],
      'Proposal': [],
      'Negotiation': [],
      'Closing': [],
      'Cancelled': [],
    };

    data.forEach(task => {
      if (grouped[task.column]) {
        grouped[task.column].push(task);
      }
    });

    setColumns(grouped);
  }, [data]);

  const columnGroups = React.useMemo(() => {
    const columnNames = Object.keys(columns);
    const groups = [];
    const orderedColumns = [
      'Prospecting', 'Initial Contact', 'Proposal', 'Negotiation', 'Closing', 'Cancelled'
    ].filter(col => columnNames.includes(col));

    for (let i = 0; i < orderedColumns.length; i += visibleColumnsCount) {
      groups.push(orderedColumns.slice(i, i + visibleColumnsCount));
    }

    return groups;
  }, [columns, visibleColumnsCount]);

  const visibleColumns = columnGroups[currentPage] || [];

  const handleDragStart = useCallback((e: React.DragEvent<HTMLDivElement>, id: number, from: string) => {
    e.dataTransfer.setData('taskId', id.toString());
    e.dataTransfer.setData('fromColumn', from);
    e.currentTarget.classList.add('dragging');
  }, []);

  const handleDragEnd = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('dragging');
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>, toColumn: string) => {
      e.preventDefault();
      const taskId = parseInt(e.dataTransfer.getData('taskId'), 10);
      const fromColumn = e.dataTransfer.getData('fromColumn');

      if (!taskId || !fromColumn || fromColumn === toColumn) return;

      setColumns(prev => {
        const task = prev[fromColumn].find(t => t.id === taskId);
        if (!task) return prev;

        const updated = { ...prev };
        updated[fromColumn] = updated[fromColumn].filter(t => t.id !== taskId);
        updated[toColumn] = [...updated[toColumn], { ...task, column: toColumn }];
        return updated;
      });

      // ✅ Persistencia al backend
      try {
        const originalSale: SaleFromAPI | undefined = originalDataMap.get(taskId);
        if (originalSale) {
          const newStatus = columnNameToNumber(toColumn);
          await updateKanbanCard(originalSale, newStatus);
        } else {
          console.warn(`Sale with ID ${taskId} not found in original data map`);
        }
      } catch (error) {
        console.error('Error updating kanban card on backend:', error);
      }
    },
    [originalDataMap]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const goToNextPage = () => {
    if (currentPage < columnGroups.length - 1) setCurrentPage(prev => prev + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 0) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div ref={boardRef} className="max-w-full mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Kanban Board</h1>
        </div>

        {columnGroups.length > 1 && (
          <div className="flex items-center justify-between mb-4">
            <button onClick={goToPrevPage} disabled={currentPage === 0} className="p-2 rounded-full">
              <ChevronLeft size={24} />
            </button>
            <span className="text-gray-600">Page {currentPage + 1} of {columnGroups.length}</span>
            <button onClick={goToNextPage} disabled={currentPage === columnGroups.length - 1} className="p-2 rounded-full">
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
                colorClass={columnColors[columnName] ?? 'bg-gray-100'}
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
  );
};

export default KanbanBoard;