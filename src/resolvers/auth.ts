import {
  BadRequestError,
  TooManyAttempsError,
  UserCredentialsError,
} from '../helpers/errors';
import models from '../models';
import bcryptjs from 'bcryptjs';
import { AppRequest } from '../types/Api';
import { MutationLoginUserArgs } from '../generated/types';
import jwt from 'jsonwebtoken';
import Config from '../config/env';
import logger from '../helpers/logger';

export const resolver = {
  Mutation: {
    async loginUser(
      _: unknown,
      { input }: MutationLoginUserArgs,
      { requestContext }: AppRequest
    ) {
      const { email } = input;

      try {
        const customer = await models.User.findFirst({
          where: {
            email: email.toLowerCase(),
            AND: {
              deletedAt: null,
            },
          },
        });

        if (!customer) {
          throw new UserCredentialsError('invalid_credentials');
        }

        if (!bcryptjs.compareSync(input.password, customer.password ?? '')) {
          throw new UserCredentialsError('invalid_credentials');
        }

        const data = {
          id: customer.id,
          updatedAt: customer.updatedAt,
        };

        const accessToken = jwt.sign(data, Config.tokenSecret);

        logger.info('loginClientUser: Client user login success', {
          requestContext,
        });

        return {
          ...customer,
          accessToken,
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        const errorCode = e.code ?? e.message;

        if (errorCode === 'auth/too-many-requests') {
          throw new TooManyAttempsError('too_many_attemps');
        }

        if (errorCode === 'auth/weak-password') {
          throw new BadRequestError('weak_password');
        }

        if (errorCode === 'auth/wrong-password') {
          throw new UserCredentialsError('invalid_credentials');
        }

        throw e;
      }
    },
  },
};
