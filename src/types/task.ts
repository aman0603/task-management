export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  dueDate: string;
}

export type SortType = 'date' | 'priority' | 'dueDate';
export type FilterType = 'all' | 'active' | 'completed';