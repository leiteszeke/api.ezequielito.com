import {
  MutationAddTimeArgs,
  MutationCreateTaskArgs,
  QueryTaskArgs,
} from '../generated/types';
import models from '../models';

export const resolver = {
  Query: {
    async tasks() {
      const tasks = await models.Task.all();

      return tasks;
    },

    async task(_: unknown, { id }: QueryTaskArgs) {
      const task = await models.Task.find(id);
      const times = await models.TimeTracking.all(task.projectId, task.id);

      return {
        ...task,
        times,
        totalTime: times.reduce((acc, cur) => acc + cur.duration, 0),
      };
    },
  },
  Mutation: {
    async addTime(
      _: unknown,
      { input: { projectId, taskId, time } }: MutationAddTimeArgs
    ) {
      await models.TimeTracking.create(projectId, {
        taskId,
        duration: time,
        costHour: 1,
        userId: '6054ebf1ce5db352682d7b31',
      });

      const task = await models.Task.find(taskId);
      const times = await models.TimeTracking.all(task.projectId, task.id);

      return {
        ...task,
        times,
        totalTime: times.reduce((acc, cur) => acc + cur.duration, 0),
      };
    },
    async createTask(
      _: unknown,
      { input: { projectId, name } }: MutationCreateTaskArgs
    ) {
      const newTask = await models.Task.create({
        projectId,
        name,
      });

      const task = await models.Task.find(newTask.id);
      const times = await models.TimeTracking.all(projectId, task.id);

      return {
        ...task,
        times,
        totalTime: times.reduce((acc, cur) => acc + cur.duration, 0),
      };
    },
  },
};
