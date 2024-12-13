import { sortBy } from 'lodash';
import { QueryCategoryArgs, QueryCategoryGroupArgs } from '../generated/types';
import models from '../models';

export const resolver = {
  Query: {
    async categories() {
      const categories = await models.Actual.getCategories();

      return sortBy(categories, 'name');
    },

    async categoryGroups() {
      const groups = await models.Actual.getCategoryGroups();

      return sortBy(groups, 'name');
    },

    async category(_: unknown, { id }: QueryCategoryArgs) {
      const categories = await models.Actual.getCategories();

      const category = categories.find((a) => a.id === id);

      if (!category) {
        return null;
      }

      return {
        ...category,
      };
    },

    async categoryGroup(_: unknown, { id }: QueryCategoryGroupArgs) {
      const groups = await models.Actual.getCategoryGroups();

      const group = groups.find((a) => a.id === id);

      if (!group) {
        return null;
      }

      return group;
    },
  },
};
