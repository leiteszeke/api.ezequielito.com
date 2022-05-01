import { QuerySprintArgs, QuerySprintsArgs } from '../generated/types';
import models from '../models';

export const resolver = {
  Query: {
    async sprints(_: unknown, { filters }: QuerySprintsArgs) {
      const sprints = await models.Sprint.all(filters ?? {});

      return sprints;
    },

    async sprint(_: unknown, { id }: QuerySprintArgs) {
      const sprint = await models.Sprint.find(id);

      return sprint;
    },
  },
};
