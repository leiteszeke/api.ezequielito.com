import { Project } from '../generated/types';
import { HoldedApi } from '../helpers/request';
import { BackendProject } from '../types/Api';
import { mapSprint } from './sprint';

export const mapProject = (input: BackendProject) => {
  const { lists, ...project } = input;

  return {
    ...project,
    sprints: lists?.map((sprint) => mapSprint(sprint)),
  };
};

const all = async () => {
  const { data: response } = await HoldedApi.get<BackendProject[]>(
    'projects/v1/projects'
  );

  return response.map(mapProject);
};

const find = async (id: Project['id']) => {
  const { data: response } = await HoldedApi.get<BackendProject>(
    `projects/v1/projects/${id}`
  );

  return mapProject(response);
};

export default {
  all,
  find,
};
