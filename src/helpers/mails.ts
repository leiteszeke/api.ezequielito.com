import logger from '../helpers/logger';
import { mergedErrors } from '../helpers/errors';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { isEmptyOrNull } from '../helpers/strings';
import ejs from 'ejs';
import path from 'path';
import Config from '../config/env';

export type EmailAddress = string | { name: string; address: string };

export type NodeMailerMessage = {
  from: EmailAddress;
  to: EmailAddress | EmailAddress[];
  cc?: EmailAddress | EmailAddress[];
  bcc?: EmailAddress | EmailAddress[];
  sender?: string;
  replyTo?: EmailAddress;
  subject: string;
  html: string;
  text: string;
  attachments?: {
    filename: string;
    content?: NodeJS.ReadableStream;
    path?: string;
  }[];
};

const NodeMailerService = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: Config.gmailAccount,
    pass: Config.gmailPassword,
  },
});

export const create = async (body: Mail.Options) => {
  try {
    logger.info('Mails create: Sending mail', {
      body: {
        from: body.from,
        headers: body.headers,
        to: body.to,
        subject: body.subject,
      },
    });

    const info = await NodeMailerService.sendMail(body);

    logger.info('Mails create: Mail sent', {
      body: {
        from: body.from,
        headers: body.headers,
        to: body.to,
        subject: body.subject,
      },
    });

    return info;
  } catch (e) {
    logger.error(`Mails create: Error sending mail`, {
      ...mergedErrors(e),
    });

    return false;
  }
};

export const createHeaders = (source: string, externalId: string | number) => {
  return {
    'X-Ezequielito-Email-Hash': btoa(JSON.stringify({ source, externalId })),
  };
};

export const parseHeaders = (header: string) => {
  if (isEmptyOrNull(header)) {
    return {};
  }

  return JSON.parse(atob(header));
};

export const generateHtml = async (
  mailFile: string,
  data: Record<string, unknown>
): Promise<string> => {
  const templatePath = path.join(__dirname, '../mails', `${mailFile}.ejs`);

  try {
    return ejs.renderFile(templatePath, data);
  } catch (err) {
    logger.error('generateHTML: Error renderizando EJS:', {
      ...mergedErrors(err),
    });

    return '';
  }
};

const Mails = {
  create,
  createHeaders,
  parseHeaders,
  generateHtml,
};

export default Mails;
