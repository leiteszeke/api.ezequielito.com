import { format, isAfter, isBefore, parse } from 'date-fns';
import { Project, QuerySprintsArgs, Sprint, Task } from '../generated/types';
import { HoldedApi } from '../helpers/request';
import { BackendProject, BackendSprint, SprintStatus } from '../types/Api';

export const mapSprint = (
  input: BackendSprint,
  project?: Project,
  tasks?: Task[]
) => {
  const { sprintend, sprintstart, completed, ...sprint } = input;
  const today = new Date();

  const dateFrom = sprintstart ? parse(sprintstart, 't', new Date()) : null;
  const dateTo = sprintend ? parse(sprintend, 't', new Date()) : null;

  let status = SprintStatus.Idle;

  if (dateFrom && isBefore(today, dateFrom)) {
    status = SprintStatus.Waiting;
  }

  if (dateFrom && isAfter(today, dateFrom)) {
    status = SprintStatus.InProgress;
  }

  if (dateTo && isAfter(today, dateTo)) {
    status = SprintStatus.Overdue;
  }

  if (completed) {
    status = SprintStatus.Completed;
  }

  return {
    ...sprint,
    dateFrom: dateFrom ? format(dateFrom, 'yyyy-MM-dd HH:mm:ss') : null,
    dateTo: dateTo ? format(dateTo, 'yyyy-MM-dd HH:mm:ss') : null,
    status,
    project,
    tasks,
  };
};

const all = async (filters: QuerySprintsArgs['filters']) => {
  const { data: response } = await HoldedApi.get<BackendProject[]>(
    'projects/v1/projects'
  );
  const { data: tasks } = await HoldedApi.get<Task[]>(`projects/v1/tasks`);

  const sprintTasks = tasks.reduce((list, task) => {
    const sprintId = task.listId;

    if (list.has(sprintId)) {
      list.set(sprintId, [...list.get(sprintId), task]);
    } else {
      list.set(sprintId, [task]);
    }

    return list;
  }, new Map());

  let sprints = response
    .map((project) =>
      project.lists.map((sprint) =>
        mapSprint(sprint, project, sprintTasks.get(sprint.id) ?? [])
      )
    )
    .flat();

  if (filters?.status && filters.status.length > 0) {
    sprints = sprints.filter((sprint) =>
      filters.status?.includes(sprint.status)
    );
  }

  if (filters?.search && filters.search !== '') {
    sprints = sprints.filter((sprint) =>
      sprint.name.toLowerCase().includes(filters.search?.toLowerCase() ?? '')
    );
  }

  return sprints;
};

const find = async (id: Sprint['id']) => {
  const { data: response } =
    await HoldedApi.get<BackendProject[]>(`projects/v1/projects`);

  const project = response.find((project) =>
    project.lists.some((sprint) => sprint.id === id)
  );

  if (!project) {
    return null;
  }

  const sprint = project?.lists.find((sprint) => sprint.id === id);

  if (!sprint) {
    return null;
  }

  const { data: tasks } = await HoldedApi.get<Task[]>(`projects/v1/tasks`);

  const sprintTasks = tasks.filter((task) => task.listId === id);

  return mapSprint(sprint, project, sprintTasks);
};

export default {
  all,
  find,
};
