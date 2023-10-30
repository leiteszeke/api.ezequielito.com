import logger from '../helpers/logger';
import Config from '../config/env';

const initCron = () => {
  if (Config.isProduction) {
    logger.debug('⏱️ Initializing Crons');
  }
};

export default initCron;
