// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import logger from '../helpers/logger';
import Tasks from './index';

const taskNameArg = process.argv.slice(2);
const taskName = taskNameArg[0];

if (!taskName || taskName === '') {
  logger.error(`Task name missing`);
  process.exit();
}

if (!Tasks[taskName]) {
  logger.error(`Task ${taskName} not found`);
  process.exit();
}

Tasks[taskName]();