import { SaleFromAPI } from './useKanban';
import { url } from '@/utils/constants';

export const fetchKanbanData = async (): Promise<SaleFromAPI[]> => {
  const response = await fetch(`${url}/sale/AllSales`, { credentials: 'include' });
  
  if (!response.ok) throw new Error('Error fetching kanban data');

  const data: SaleFromAPI[] = await response.json();
  return data;
};
