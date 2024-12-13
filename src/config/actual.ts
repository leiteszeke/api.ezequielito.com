import logger from '../helpers/logger';
import { errorMessage } from '../helpers/errors';
import * as actual from '@actual-app/api';
import Config from './env';

export const initActual = async () => {
  try {
    logger.info('🏦 Actual starting...');

    await actual
      .init({
        dataDir: './actual-db',
        serverURL: Config.actualEndpoint,
        password: Config.actualPassword,
      })
      .then(() => logger.info('🏦 Actual started'))
      .catch((err) =>
        logger.error(`🏦 Actual stating error`, {
          error: err,
        })
      );

    await actual.downloadBudget(Config.actualBudgetId, {
      password: Config.actualBudgetPassword,
    });

    return true;
  } catch (e) {
    logger.error(`🏦 Actual starting error`, {
      ...errorMessage(e),
    });

    actual.shutdown();

    return false;
  }
};
