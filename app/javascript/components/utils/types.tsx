export type Done =
  | { id: '-1'; text: '未着手' }
  | { id: '0'; text: '着手' }
  | { id: '1'; text: '完了' };

export type PriorityNumber = 0 | 1 | 2;

export interface Task {
  id?: string;
  title?: string;
  description?: string;
  deadline?: string;
  done?: Done;
  priorityNumber?: PriorityNumber;
  createdAt?: string;
}

export type SortType = 'created_at' | 'deadline' | 'priority_number';
export type SearchTarget = 'all' | 'title' | 'description';