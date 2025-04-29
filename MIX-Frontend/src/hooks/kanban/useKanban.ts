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

export const useKanban = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      try {
        const saleData: SaleFromAPI[] = await fetchKanbanData();

        const transformed: Task[] = saleData.map((sale) => ({
          id: sale.SaleID,
          title: sale.EnterpriseName,
          column: sale.Status,
          createdAt: sale.CreationDate,
          Enterprise: sale.EnterpriseName,
          TotalSale: sale.Total ?? 0,
          TotalComission: 0,
        }));

        setTasks(transformed);
      } catch (error) {
        console.error('Error loading kanban data', error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { tasks, loading };
};