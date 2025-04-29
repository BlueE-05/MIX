// types.ts
export interface Task {
  id: number;
  title: string;
  description?: string;
  column: string; // <- esta es la propiedad que faltaba
}

  
  export interface ColumnData {
    title: string;
    tasks: Task[];
  }