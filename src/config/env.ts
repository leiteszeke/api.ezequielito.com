const parseEmptyString = (value: string | undefined): string => {
  if (!value) {
    return '';
  }

  return value.toString();
};

const parseString = (value: string | undefined): string => {
  return (value ?? '').toString();
};

export const parseNumber = (value: string | undefined): number => {
  return Number(value ?? 0);
};

const parseBoolean = (value: string | boolean | undefined): boolean => {
  if (!value) {
    return false;
  }

  if (value === 'true' || value === true) {
    return true;
  }

  return false;
};

const Config = {
  port: parseString(process.env.PORT),
  wsPort: parseString(process.env.WS_PORT),

  socketEnabled: parseBoolean(process.env.SOCKET_ENABLED),

  logtailToken: parseString(process.env.LOGTAIL_TOKEN),

  adminUrl: parseEmptyString(process.env.ADMIN_URL),

  tasksApiKey: parseString(process.env.TASKS_API_KEY),

  sendgridApiKey: parseString(process.env.SENDGRID_API_KEY),
  sendMails: parseBoolean(process.env.SEND_MAILS),

  tokenSecret: parseString(process.env.TOKEN_SECRET),
  env: parseString(process.env.NODE_ENV),
  isLocal: parseString(process.env.NODE_ENV) === 'local',
  isQA: parseString(process.env.NODE_ENV) === 'qa',
  isProduction: parseString(process.env.NODE_ENV) === 'production',
};

export default Config;