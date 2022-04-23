// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import http from 'http';
import helmet from 'helmet';
import getSchema from './schemas';
import authMiddleware from './middlewares/auth';
import logger from './helpers/logger';
import { GraphQLError } from 'graphql';

const PORT = process.env.PORT;
const isProduction = process.env.NODE_ENV === 'production';

async function startApolloServer() {
  const app = express();
  app.use(express.json());
  app.use(authMiddleware());

  app.use(
    helmet({
      crossOriginEmbedderPolicy: isProduction,
      contentSecurityPolicy: isProduction ? undefined : false,
    })
  );

  const httpServer = http.createServer(app);
  const schema = await getSchema();
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      return {
        user: req.body.user,
      };
    },
    formatError: (err: GraphQLError) => {
      logger.error(`☸️ GraphQL ${err.extensions.code} error`, {
        errorMessage: err.message,
        code: err.extensions.code,
      });

      return {
        message: err.message,
        code: err.extensions.code,
      };
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );

  logger.info(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
}

startApolloServer();
