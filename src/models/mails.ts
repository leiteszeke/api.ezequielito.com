import axios from 'axios';
import logger from '../helpers/logger';
import { mergedErrors } from '../helpers/errors';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export type EnvialoSimpleMessage<C = unknown, S = unknown> = {
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
  templateID?: string;
  attachments?: {
    disposition: 'inline' | 'attachment';
    id: string;
    filename: string;
    content: string;
  }[];
  context?: C[];
  substitutions?: S[];
};

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

const API_KEY = '';

export const MailService = axios.create({
  baseURL: `https://api.envialosimple.email/api/v1`,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
    maxBodyLength: Infinity,
  },
});

const NodeMailerService = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    // user: Config.gmailAccount,
    // pass: Config.gmailPassword,
  },
});

export const create = async (body: Mail.Options) => {
  try {
    //const response = await MailService.post(`/mail/send`, body);
    //return response.data;

    const info = await NodeMailerService.sendMail(body);

    return info;
  } catch (e) {
    logger.error(`Error sending mail`, {
      ...mergedErrors(e),
    });

    return false;
  }
};

const Mails = {
  create,
};

export default Mails;
