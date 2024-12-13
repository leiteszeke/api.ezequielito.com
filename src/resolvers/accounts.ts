import { sortBy } from 'lodash';
import { QueryAccountArgs } from '../generated/types';
import models from '../models';

const parseBalance = (n: number) => {
  const regex = new RegExp(/(\d+)(\d{2})$/);
  const [, integer, decimal] = regex.exec(n.toString()) ?? [];

  return Number(`${integer}.${decimal}`);
};

export const resolver = {
  Query: {
    async accounts() {
      const accounts = await models.Actual.getAccounts();

      const accountsWithBalance = await Promise.all(
        accounts.map(async (a) => {
          const balance = await models.Actual.getAccountBalance(a.id);

          return {
            ...a,
            balance: parseBalance(balance),
          };
        })
      );

      return sortBy(accountsWithBalance, 'name');
    },

    async account(_: unknown, { id }: QueryAccountArgs) {
      const accounts = await models.Actual.getAccounts();

      const account = accounts.find((a) => a.id === id);

      if (!account) {
        return null;
      }

      const balance = await models.Actual.getAccountBalance(id);

      return {
        ...account,
        balance,
      };
    },
  },
};
