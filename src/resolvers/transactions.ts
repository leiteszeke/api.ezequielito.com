import { sortBy } from 'lodash';
import {
  QueryTransactionArgs,
  QueryTransactionsArgs,
} from '../generated/types';
import models from '../models';

export const resolver = {
  Query: {
    async transactions(
      _: unknown,
      { accountId, dateFrom, dateTo }: QueryTransactionsArgs
    ) {
      const transactions = await models.Actual.getTransactions(
        accountId,
        dateFrom,
        dateTo
      );

      return sortBy(transactions, 'date');
    },

    async transaction(_: unknown, { id, accountId }: QueryTransactionArgs) {
      const transactions = await models.Actual.getTransactions(
        accountId,
        '',
        ''
      );
      const transaction = transactions.find((t) => t.id === id);

      return transaction;
    },
  },
};
