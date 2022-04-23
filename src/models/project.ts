import { Project } from '../generated/types';
import { HoldedApi } from '../helpers/request';

const all = async () => {
  const { data: response } = await HoldedApi.get('projects/v1/projects');

  return response;
};

const find = async (id: Project['id']) => {
  const { data: response } = await HoldedApi.get(`projects/v1/projects/${id}`);

  return response;
};

export default {
  all,
  find,
};
