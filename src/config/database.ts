import { PrismaClient } from '@prisma/client';
import logger from '../helpers/logger';

export const prisma = new PrismaClient();

export const initPrisma = async () => {
  try {
    logger.info('🌿 MongoDB connecting...');

    await prisma
      .$connect()
      .then(() => logger.info('🌿 MongoDB connected'))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((err: any) =>
        logger.error(`🌿 MongoDB connection error`, {
          error: err,
        })
      );
  } catch (e) {
    logger.error(`🌿 MongoDB connection error`, {
      error: e,
    });
  }
};