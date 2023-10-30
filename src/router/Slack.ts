import { Router } from 'express';
import logger from '../helpers/logger';

const SlackRouter = Router();

SlackRouter.post('/', async (req, res) => {
  const { payload } = req.body;
  const input = JSON.parse(payload);

  logger.info('Slack Router: POST /', {
    callback_id: input.callback_id,
    type: input.type,
  });

  return res.end();
});

SlackRouter.get('/', (req, res) => {
  logger.info('Slack Router: GET /', {
    body: req.body,
    query: req.query,
  });

  return res.json({});
});

export default SlackRouter;
