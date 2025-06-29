import {
  parseBoolean,
  parseEmptyString,
  parseNumber,
  parseString,
} from '../helpers/parsers';

const Config = {
  port: parseString(process.env.PORT),
  wsPort: parseString(process.env.WS_PORT),
  isLoggingDisabled: parseBoolean(process.env.DISABLE_LOGGING),

  socketEnabled: parseBoolean(process.env.SOCKET_ENABLED),

  logtailHost: parseString(process.env.LOGTAIL_HOST),
  logtailToken: parseString(process.env.LOGTAIL_TOKEN),

  lokiEndpoint: parseString(process.env.LOKI_ENDPOINT),

  adminUrl: parseEmptyString(process.env.ADMIN_URL),
  pricesUrl: parseEmptyString(process.env.PRICES_URL),

  tasksApiKey: parseString(process.env.TASKS_API_KEY),

  tokenSecret: parseString(process.env.TOKEN_SECRET),
  env: parseString(process.env.NODE_ENV),
  isLocal: parseString(process.env.NODE_ENV) === 'local',
  isTest: parseString(process.env.NODE_ENV) === 'test',
  isQA: parseString(process.env.NODE_ENV) === 'qa',
  isProduction: parseString(process.env.NODE_ENV) === 'production',

  sendMails: parseBoolean(process.env.SEND_MAILS),
  gmailAccount: parseString(process.env.GMAIL_ACCOUNT),
  gmailPassword: parseString(process.env.GMAIL_PASSWORD),

  holdedApiUrl: parseNumber(process.env.HOLDED_API_URL),
  holdedApiKey: parseString(process.env.HOLDED_API_KEY),

  slackApiToken: parseString(process.env.SLACK_TOKEN),
  slackApiUrl: parseString(process.env.SLACK_API_URL),

  redisHost: parseString(process.env.REDIS_HOST),
  redisPort: parseString(process.env.REDIS_PORT),
  redisPass: parseString(process.env.REDIS_PASS),

  actualEndpoint: parseString(process.env.ACTUAL_ENDPOINT),
  actualPassword: parseString(process.env.ACTUAL_PASSWORD),
  actualBudgetId: parseString(process.env.ACTUAL_BUDGET_ID),
  actualBudgetPassword: parseString(process.env.ACTUAL_BUDGET_PASS),

  smartThingsApiUrl: parseString(process.env.SMART_THINGS_URL),
  smartThingsApiKey: parseString(process.env.SMART_THINGS_TOKEN),
};

export default Config;
