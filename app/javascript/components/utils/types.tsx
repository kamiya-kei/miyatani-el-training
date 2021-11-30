export type Done =
  | { id: '-1'; text: '未着手' }
  | { id: '0'; text: '着手' }
  | { id: '1'; text: '完了' };

export type PriorityNumber = 0 | 1 | 2;

export interface Label {
  id?: string;
  name?: string;
  tasksCount?: number;
}

export interface Task {
  id?: string;
  title?: string;
  description?: string;
  deadline?: string;
  done?: Done;
  priorityNumber?: PriorityNumber;
  labels: Label[];
  createdAt?: string;
}

export type SortType = 'created_at' | 'deadline' | 'priority_number';
export type SearchTarget = 'all' | 'title' | 'description';

export type Role = { id: '0'; text: 'regular' } | { id: '1'; text: 'admin' };

export interface User {
  id?: string;
  name?: string;
  role?: Role;
  createdAt?: string;
  tasksCount?: number;
}
