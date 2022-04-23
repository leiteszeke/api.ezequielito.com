import { Request, Response, NextFunction } from 'express';
import logger from '../helpers/logger';

const authMiddleware = () => {
  return async function (req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers && req.headers.authorization;
    const apiKey = req.headers && req.headers['x-api-key'];

    logger.debug(`No user with the provided token has been found.`, {
      withAccessToken: !!accessToken,
      withApiKey: !!apiKey,
    });

    return next();

    // return res.status(401).json({ message: 'Unauthorized' });
  };
};

export default authMiddleware;
