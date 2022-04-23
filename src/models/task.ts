import { Task } from '../generated/types';
import { HoldedApi } from '../helpers/request';

const all = async (): Promise<Task[]> => {
  const { data: response } = await HoldedApi.get('projects/v1/tasks');

  return response;
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
