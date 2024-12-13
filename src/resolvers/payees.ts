import { sortBy } from 'lodash';
import { QueryPayeeArgs } from '../generated/types';
import models from '../models';

export const resolver = {
  Query: {
    async payees() {
      const payees = await models.Actual.getPayees();

      return sortBy(payees, 'name');
    },

    async payee(_: unknown, { id }: QueryPayeeArgs) {
      const payees = await models.Actual.getPayees();

      const payee = payees.find((a) => a.id === id);

      if (!payee) {
        return null;
      }

      const rules = await models.Actual.getPayeeRules(id);

      return {
        ...payee,
        rules,
      };
    },
  },
};
