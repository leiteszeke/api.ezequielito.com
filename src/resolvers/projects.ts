import { QueryProjectArgs } from '../generated/types';
import models from '../models';

export const resolver = {
  Query: {
    async projects() {
      const projects = await models.Project.all();

      return projects;
    },

    async project(_: unknown, { id }: QueryProjectArgs) {
      const project = await models.Project.find(id);

      return project;
    },
  },
  Mutation: {},
};
