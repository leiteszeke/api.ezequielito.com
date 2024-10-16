import { Router } from 'express';
import logger from '../helpers/logger';
import Tasks from '../tasks';
import Config from '../config/env';
import { ResponseCode, ResponseMessage } from '../types/Api';

const TasksRouter = Router();

TasksRouter.post('/', async (req, res) => {
  if (req.headers['tasks-api-key'] !== Config.tasksApiKey) {
    return res
      .status(ResponseCode.NotAuthorized)
      .json({ message: ResponseMessage.NotAuthorized });
  }

  const taskName = req.body.taskId;
  const payload = req.body.payload;

  if (!Tasks[taskName]) {
    logger.error(`Task ${taskName} not found`);

    return res.status(400);
  }

  logger.info('Running task', { taskName });

  const response = await Tasks[taskName](payload);

  res.json({ data: response });
});

export default TasksRouter;
