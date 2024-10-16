import { Router } from 'express';

import TasksRouter from './Tasks';
import SlackRouter from './Slack';
import PassWalletRouter from './PassWallet';

const BasicRouter = Router();

BasicRouter.get('/', (_, res) => res.redirect('https://daruma.cloud'));
BasicRouter.get('/health', (_, res) => res.json({ status: 'ok' }));

BasicRouter.use('/tasks', TasksRouter);
BasicRouter.use('/slack', SlackRouter);
BasicRouter.use('/passwallet', PassWalletRouter);

export default BasicRouter;
