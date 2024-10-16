import { PrismaClient } from '@prisma/client';
import logger from '../helpers/logger';
import { errorMessage } from '../helpers/errors';

export const prisma = new PrismaClient({
  // log: ['query'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

export const initPrisma = async () => {
  try {
    logger.info('🛢 MySQL connecting...');

    /*
    prisma.$use(async (params, next) => {
      return next(params);
    });
    */

    await prisma
      .$connect()
      .then(() => logger.info('🛢 MySQL connected'))
      .catch((err) =>
        logger.error(`🛢 MySQL connection error`, {
          error: err,
        })
      );

    return true;
  } catch (e) {
    logger.error(`🛢 MySQL connection error`, {
      ...errorMessage(e),
    });

    return false;
  }
};
