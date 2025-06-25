import { Router } from 'express';
import logger from '../helpers/logger';
import SmartThings from '../models/smartThings';
import { mergedErrors } from '../helpers/errors';

const WebhooksRouter = Router();

WebhooksRouter.post('/', async (req, res) => {
  const { event, payload } = req.body;

  logger.info('Webhooks Router: POST /', {
    event,
    payload,
  });

  if (event === 'home_assistant_down') {
    if (payload.subject === 'Monitor is DOWN: Home Assistant') {
      try {
        const devices = await SmartThings.devices();
        const device = devices.find(
          (device) => device.label === 'Enchufe Mini Pc'
        );

        if (!device) {
          logger.error('Webhooks Router: Device not found', {
            event,
            payload,
            devices,
          });
        } else {
          await SmartThings.update(device.deviceId, [
            {
              component: 'main',
              capability: 'switch',
              command: 'off',
            },
          ]);

          await new Promise((resolve) => setTimeout(resolve, 1000));

          await SmartThings.update(device.deviceId, [
            {
              component: 'main',
              capability: 'switch',
              command: 'on',
            },
          ]);

          logger.info('Webhooks Router: Device updated', {
            event,
            payload,
            device,
          });
        }
      } catch (error) {
        logger.error('Webhooks Router: Error', {
          event,
          payload,
          ...mergedErrors(error),
        });
      }
    }
  }

  return res.end();
});

WebhooksRouter.get('/', (req, res) => {
  logger.info('Webhooks Router: GET /', {
    body: req.body,
    query: req.query,
  });

  return res.json({});
});

export default WebhooksRouter;
