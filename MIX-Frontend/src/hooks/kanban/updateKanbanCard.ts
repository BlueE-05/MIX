import { url } from '@/utils/constants';
import { SaleFromAPI } from './useKanban';



export const updateKanbanCard = async (kanbanData: SaleFromAPI, column: number): Promise<void> => {
  const response = await fetch(`${url}/${kanbanData.SaleID}/${column}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error updating kanban card: ${response.status} - ${errorText}`);
  }
};