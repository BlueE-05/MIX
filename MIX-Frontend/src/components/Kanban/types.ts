// types.ts
export interface Task {
    id: number;
    title: string;
    description?: string;
  }
  
  export interface ColumnData {
    title: string;
    tasks: Task[];
  }