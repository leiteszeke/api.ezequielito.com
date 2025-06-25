import { Router } from 'express';

import TasksRouter from './Tasks';
import SlackRouter from './Slack';
import PassWalletRouter from './PassWallet';
import WebhooksRouter from './Webhooks';

const BasicRouter = Router();

BasicRouter.get('/', (_, res) => res.redirect('https://leites.dev'));
BasicRouter.get('/health', (_, res) => res.json({ status: 'ok' }));

BasicRouter.use('/tasks', TasksRouter);
BasicRouter.use('/slack', SlackRouter);
BasicRouter.use('/passwallet', PassWalletRouter);
BasicRouter.use('/webhooks', WebhooksRouter);

export default BasicRouter;
