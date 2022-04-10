export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export function getTaskStatusesErrorString(): string {
  return `status must be a valid value: ${Object.keys(TaskStatus).toString()}`;
}
