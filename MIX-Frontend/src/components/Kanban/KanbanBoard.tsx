// KanbanBoard.tsx
'use client';
import React, { useState, useCallback } from 'react';
import Column from './Column';
import { Task } from './types'; // Importar desde el archivo de tipos
// Asumiendo que los estilos del modal y el layout base están en KanbanBoard.css
// y que Tailwind se usa para el resto.
import './KanbanBoard.css'; 

const initialColumns: { [key: string]: Task[] } = {
  'Prospecting': [
    { id: 1, title: 'Contactar a cliente potencial', description: 'Enviar correo electrónico de presentación' },
    { id: 2, title: 'Llamada de seguimiento', description: 'Llamar para dar seguimiento a correo enviado' },
  ],
  'Initial Contact': [
    { id: 3, title: 'Preparar cotización', description: 'Crear cotización para cliente potencial' },
  ],
  'Proposal': [
    { id: 4, title: 'Negociar términos', description: 'Negociar términos y condiciones del contrato' },
    { id: 5, title: 'Cerrar venta', description: 'Finalizar y firmar contrato con el cliente' },
  ],
  'Negotiation': [
    { id: 6, title: 'Negociar términos', description: 'Negociar términos y condiciones del contrato' },
    { id: 7, title: 'Cerrar venta', description: 'Finalizar y firmar contrato con el cliente' },
  ],  
  'Closing': [
    { id: 8, title: 'Negociar términos', description: 'Negociar términos y condiciones del contrato' },
    { id: 9, title: 'Cerrar venta', description: 'Finalizar y firmar contrato con el cliente' },
  ],
  'Cancelled': [
    { id: 10, title: 'Negociar términos', description: 'Negociar términos y condiciones del contrato' },
    { id: 11, title: 'Cerrar venta', description: 'Finalizar y firmar contrato con el cliente' },
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-6">
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
  );
};

export default KanbanBoard;