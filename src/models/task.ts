import { QueryTasksArgs, Task } from '../generated/types';
import { HoldedApi } from '../helpers/request';

const all = async (filters: QueryTasksArgs['filters']): Promise<Task[]> => {
  const { data: response } = await HoldedApi.get<Task[]>('projects/v1/tasks');

  let tasks = response;

  if (filters?.status && filters.status.length > 0) {
    tasks = tasks.filter((task) => {
      return filters.status?.includes(task.status);
    });
  }

  if (filters?.search && filters.search !== '') {
    tasks = tasks.filter((task) =>
      task.name.toLowerCase().includes(filters.search?.toLowerCase() ?? '')
    );
  }

  if (filters?.projectId && filters.projectId !== '') {
    tasks = tasks.filter((task) => task.project.id === filters.projectId);
  }

  return tasks;
};

const find = async (id: Task['id']): Promise<Task> => {
  const { data: response } = await HoldedApi.get(`projects/v1/tasks/${id}`);

  return response;
};

const create = async (
  body: Pick<Task, 'projectId' | 'name'>
): Promise<Pick<Task, 'id'>> => {
  const { data: response } = await HoldedApi.post(`projects/v1/tasks`, body);

  return response;
};

export default {
  all,
  create,
  find,
};
