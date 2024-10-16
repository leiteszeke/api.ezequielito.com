// Dependencies
import sgMail from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';
import { EmailData } from '@sendgrid/helpers/classes/email-address';
import Config from '../config/env';

export type EmailFrom = {
  name?: string;
  email: string;
};

export type EmailTo = {
  name?: string;
  email: string;
};

export type EmailProps = {
  from?: EmailFrom;
  to?: Array<EmailTo>;
  subject?: string;
  replyTo?: string;
  body?: string;
  html?: string;
};

class Email {
  private from?: EmailFrom;
  private to?: EmailData | EmailData[];
  private subject?: string;
  private replyTo = 'ezequiel@leites.dev';
  private body?: string;
  private html?: string;

  constructor(input: EmailProps) {
    this.from = input.from || {
      name: '👨🏻‍💻 Ezequielito',
      email: 'noreply@leites.dev',
    };
    this.to = input.to;
    this.subject = input.subject;
    this.body = input.body;
    this.html = input.html;

    if (input.replyTo) {
      this.replyTo = input.replyTo;
    }

    if (Config.sendGridApiKey) {
      sgMail.setApiKey(Config.sendGridApiKey);
    }
  }

  send(): void {
    if (!this.to) throw new Error('no_recipient');
    if (!this.from) throw new Error('no_sender');
    if (!Config.sendMails) throw new Error('mails_disabled');

    sgMail.send({
      to: this.to,
      from: this.from,
      subject: this.subject,
      text: this.body,
      replyTo: this.replyTo,
      html: this.html || this.body,
    } as MailDataRequired);
  }
}

export default Email;
