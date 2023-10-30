import { User } from '@prisma/client';
import { Project, Sprint } from './generated/types';

export type Generic<T = unknown> = Record<string, T>;

export type ServerToClientEvents = {
  PRODUCT_UPDATED: (extraData?: Generic) => void;
};

export type ClientToServerEvents = {
  test: () => void;
};
export interface Context {
  user: User;
  graphQL: {
    query: string;
    variables: Generic;
  };
}


// export type IOServer = Socket<ClientToServerEvents, ServerToClientEvents>;

export enum ResponseCode {
  Success = 200,
  Created = 201,
  NoAuthorative = 200, // 203,
  NoContent = 200, // 204,
  BadRequest = 400,
  NotAuthorized = 401,
  NotFound = 404,
}

export enum ResponseMessage {
  Success = 'success',
  Updated = 'updated',
  Deleted = 'deleted',
  Error = 'error',
  NotFound = 'not_found',
  BadRequest = 'bad_request',
  InvalidFile = 'invalid_file',
  NotAuthorized = 'not_authorized',
}


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