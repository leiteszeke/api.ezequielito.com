import { Request, Response, NextFunction } from 'express';
import logger from '../helpers/logger';
import models from '../models';
import jwt from 'jsonwebtoken';
import gql from 'graphql-tag';
import { User } from '@prisma/client';
import { ResponseCode, ResponseMessage } from '../types/Api';
import { differenceInSeconds } from 'date-fns/differenceInSeconds';
import Config from '../config/env';

const publicQueries = ['loginUser'];

const parseQuery = (query: string) => {
  if (!query) {
    return false;
  }

  const parsed = gql`
    ${query}
  `;

  const value =
    // @ts-expect-error bad typing
    parsed?.definitions?.[0].selectionSet?.selections?.[0]?.name?.value;

  return publicQueries.includes(value);
};

const authMiddleware = () => {
  return async function (req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers && req.headers.authorization;
    const apiKey = req.headers && req.headers['x-api-key'];
    const isPublic = true || parseQuery(req.body.query);

    if (isPublic) {
      return next();
    }

    if (accessToken) {
      try {
        const verified = jwt.verify(
          accessToken.replace('Bearer ', ''),
          Config.tokenSecret
        );

        if (verified) {
          const verifiedUser = verified as User;

          const user = await models.User.findFirst({
            where: {
              id: verifiedUser.id,
              deletedAt: null,
            },
          });

          if (user) {
            let refreshedToken;

            const diffInSeconds = !verifiedUser.updatedAt
              ? 1
              : differenceInSeconds(
                  user.updatedAt,
                  new Date(verifiedUser.updatedAt)
                );

            if (diffInSeconds > 0) {
              const data = {
                id: user.id,
                updatedAt: user.updatedAt,
              };

              refreshedToken = jwt.sign(data, Config.tokenSecret);

              logger.warn('🚪 Access Token Out to Date. Updating it', {
                oldToken: accessToken.replace('Bearer ', ''),
                newToken: refreshedToken,
              });
            }

            req.body = {
              ...req.body,
              user,
              refreshedToken,
            };

            return next();
          }
        }
      } catch (error) {
        logger.warn('🚪 Access Token Auth Error', { error });
      }
    }

    logger.warn(`No user with the provided token has been found.`, {
      accessToken,
      apiKey,
      withAccessToken: !!accessToken,
      withApiKey: !!apiKey,
      headers: req.headers,
      body: req.body,
      query: req.query,
      url: req.url,
    });

    return res
      .status(ResponseCode.NotAuthorized)
      .json({ message: ResponseMessage.NotAuthorized });
  };
};

export default authMiddleware;
