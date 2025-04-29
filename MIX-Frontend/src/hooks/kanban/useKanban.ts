// useKanban.ts
import { useState, useEffect } from 'react';
import { Task } from '@/types/KanbanTypes';
import { fetchKanbanData } from './fetchKanbanData';

export interface SaleFromAPI {
  SaleID: number;
  EnterpriseName: string;
  Total: number | null;
  Status: string;
  CreationDate: string;
}

export const useKanban = (): {
  tasks: Task[];
  originalDataMap: Map<number, SaleFromAPI>;
  loading: boolean;
} => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [originalDataMap, setOriginalDataMap] = useState<Map<number, SaleFromAPI>>(new Map());
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      try {
        const saleData: SaleFromAPI[] = await fetchKanbanData();
        const newMap = new Map<number, SaleFromAPI>();

        const transformed: Task[] = saleData.map((sale) => {
          newMap.set(sale.SaleID, sale);

          return {
            id: sale.SaleID,
            title: sale.EnterpriseName,
            column: sale.Status, // Consider mapping string status to a number if necessary
            createdAt: sale.CreationDate,
            Enterprise: sale.EnterpriseName,
            TotalSale: sale.Total ?? 0,
            TotalComission: 0, // You may need logic to compute this
          };
        });

        setTasks(transformed);
        setOriginalDataMap(newMap);
      } catch (error) {
        console.error('Error loading kanban data', error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { tasks, originalDataMap, loading };
};