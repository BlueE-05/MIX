// fetchKanbanData.ts
import { SaleFromAPI } from './useKanban';
import { url } from '@/utils/constants';

export const fetchKanbanData = async (): Promise<SaleFromAPI[]> => {
  const response: Response = await fetch(`${url}/sale/AllSales`, { credentials: 'include' });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error fetching kanban data: ${response.status} - ${errorText}`);
  }

  const data: SaleFromAPI[] = await response.json();
  return data;
};