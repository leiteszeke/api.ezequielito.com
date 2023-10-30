import { Router } from 'express';

import TasksRouter from './Tasks';
import SlackRouter from './Slack';

const BasicRouter = Router();

BasicRouter.get('/', (_, res) => res.redirect('https://daruma.cloud'));
BasicRouter.get('/health', (_, res) => res.json({ status: 'ok' }));

BasicRouter.use('/tasks', TasksRouter);
BasicRouter.use('/slack', SlackRouter);

export default BasicRouter;
