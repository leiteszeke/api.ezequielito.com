import { Project, Sprint } from './generated/types';

export type BackendSprint = Omit<Sprint, 'dateFrom' | 'dateTo'> & {
  completed: boolean;
  sprintstart: Sprint['dateFrom'];
  sprintend: Sprint['dateTo'];
};

export enum SprintStatus {
  Idle = 'idle',
  Completed = 'completed',
  InProgress = 'in-progress',
  Waiting = 'waiting',
  Overdue = 'overdue',
}

export type BackendProject = Omit<Project, 'sprints'> & {
  lists: BackendSprint[];
};
