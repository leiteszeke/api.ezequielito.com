// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import 'reflect-metadata';
import express from 'express';
import http from 'http';
import helmet from 'helmet';
import getSchema from './schemas';
import logger from './helpers/logger';
import { CustomApolloServer } from './lib/apollo/customServer';
import { GraphQLError } from 'graphql';
import { initPrisma } from './config/database';
import Config from './config/env';
import Routes from './router';
import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import authMiddleware from './middlewares/auth';
import initCron from './config/cron';
import { Context } from './types/Api';
import { initActual } from './config/actual';

const VOID_ROUTES = ['/favicon.icon', '/favicon.ico'];

async function startApolloServer() {
  const app = express();

  app.use(express.json());
  app.use(
    cors({
      exposedHeaders: ['Content-Filename', 'X-Ezequielito-New-Token'],
    })
  );
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(
    fileUpload({
      createParentPath: true,
    })
  );

  app.use('/', Routes);

  app.use(
    helmet({
      crossOriginEmbedderPolicy: Config.isProduction,
      contentSecurityPolicy: Config.isProduction ? undefined : false,
    })
  );

  app.use('/graphql', authMiddleware());

  const httpServer = http.createServer(app);

  await Promise.all([initPrisma(), initActual(), initCron()]);

  const schema = await getSchema();

  const server = new CustomApolloServer({
    persistedQueries: false,
    schema,
    context: async ({ req }) => {
      return {
        user: req.body.user,
        requestContext: {
          appVersion: req.headers['x-ezequielito-app-version'],
          service: req.headers['x-ezequielito-service'],
        },
        graphQL: {
          query: req.body.query,
          variables: req.body.variables,
        },
      };
    },
    formatError: (err: GraphQLError, context: Context) => {
      const warnCodes = ['NOT_ALLOWED', 'USER_NOT_FOUND', 'NOT_FOUND'];
      const input = {
        errorMessage: err.message,
        code: err.extensions.code,
        data: err.extensions.data,
        input: context.graphQL,
      };

      if (err.message.includes('GraphQL introspection is not allowed')) {
        return {
          message: err.message,
          code: err.extensions.code,
          data: err.extensions.data,
        };
      }

      if (warnCodes.includes(err.extensions.code as string)) {
        logger.warn(
          `☸️ GraphQL ${err.extensions.code} warning: ${err.message}`,
          input
        );
      } else {
        logger.error(
          `☸️ GraphQL ${err.extensions.code} error: ${err.message}`,
          input
        );
      }

      return {
        message: err.message,
        code: err.extensions.code,
        data: err.extensions.data,
      };
    },
    plugins: [
      {
        async requestDidStart() {
          return {
            async willSendResponse({ response, context }) {
              if (context.refreshedToken) {
                response.http?.headers.set(
                  'Access-Control-Expose-Headers',
                  'X-Ezequielito-New-Token'
                );
                response.http?.headers.set(
                  'X-Ezequielito-New-Token',
                  context.refreshedToken
                );
              }
            },
          };
        },
      },
    ],
  });

  await server.start();
  server.applyMiddleware({ app });

  app.get('*', (req, res) => {
    if (VOID_ROUTES.includes(req.path)) {
      return res.json({});
    }

    logger.loki.warn(`Route ${req.path} not found`, {
      path: req.path,
      params: req.params,
      body: req.body,
      query: req.query,
      headers: req.headers,
    });

    res.redirect('https://daruma.cloud');
  });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: Config.port }, resolve)
  );

  logger.info(
    `🚀 Server ready at http://localhost:${Config.port}${server.graphqlPath}`
  );
}

const init = async () => {
  startApolloServer();

  process.on('unhandledRejection', (reason: Error) => {
    logger.error('Unhandled Rejection', {
      reason: reason.message,
      stack: reason.stack,
    });
  });

  process.on('uncaughtException', (error: Error) => {
    logger.error('Uncaught Exception', {
      reason: error.message,
      stack: error.stack,
    });
  });
};

init();
