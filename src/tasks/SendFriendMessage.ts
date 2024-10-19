import { shuffle } from 'lodash';
import logger from '../helpers/logger';
import Mail from 'nodemailer/lib/mailer';
import { BadRequestError } from '../helpers/errors';
import models from '../models';

const DEBUG = false;

type Friend = {
  id: number;
  name: string;
  lastname: string;
  email: string;
};

const Friends: Friend[] = [
  {
    id: 1,
    name: '👨🏻‍💻 Ezequiel',
    lastname: 'Leites',
    email: 'ezequiel@leites.dev',
  },
  {
    id: 2,
    name: '👦🏻 Joaquin',
    lastname: 'Leites',
    email: 'joa.leites.12@gmail.com',
  },
  {
    id: 3,
    name: '👩🏻 Malena',
    lastname: 'Leites',
    email: 'malenaleites24@gmail.com',
  },
  {
    id: 4,
    name: '👨🏻‍🦰 Antonio',
    lastname: 'Leites',
    email: 'antonioleites37@gmail.com',
  },
  {
    id: 5,
    name: '👩🏻‍🦰 Verónica',
    lastname: 'Felicciotti',
    email: 'verofelicciotti@gmail.com',
  },
  {
    id: 6,
    name: '👩🏻 Lucia',
    lastname: 'Domingo',
    email: 'luciadomingosavino@gmail.com',
  },
];

const getTemplate = (user: { from: Friend; to: Friend }): string => `
  <h1>Hola ${user.from.name}</h1>
  <p>
    Tu amigo invisible para este año será <strong>${user.to.name}</strong>
  </p>
  <span>No te olvides de eliminar este mensaje</span>
`;

const SendFriendMessage = async () => {
  let bucket = shuffle([...Friends]);
  const total: { from: Friend; to: Friend }[] = [];
  const shuffled = shuffle(Friends);

  shuffled.forEach((friend) => {
    const toFriend = bucket.filter((u) => u.id !== friend.id).pop();

    total.push({
      from: friend,
      to: toFriend ?? friend,
    });

    bucket = bucket.filter((u) => u.id !== toFriend?.id);
  });

  const error = total.some((t) => t.from.id === t.to.id);

  if (error) {
    return logger.error('Error generating array');
  }

  for (const user of total) {
    const html = getTemplate(user);
    const text = html.replace(/(<([^>]+)>)/gi, '');

    const input: Mail.Options = {
      from: {
        name: 'Tu Amigo Invisible - Daruma Cloud',
        address: 'no.responder@daruma.cloud',
      },
      to: [DEBUG ? `ezequiel+id${user.from.id}@leites.dev` : user.from.email],
      subject: `${user.from.name}... Tu amigo invisible será...`,
      html,
      text,
    };

    logger.info(`Sending email to ${user.from.name} <${user.from.email}>...`);

    try {
      const sent = await models.Mails.create(input);

      if (!sent) {
        throw new BadRequestError('error_sending_email');
      }

      logger.info(
        `Email to ${user.from.name} <${user.from.email}> sent succesfully...`
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      logger.error(`Error sending email to ${user.from.name}`, {
        message: e.message,
        body: e.response,
      });
    }
  }
};

export default SendFriendMessage;
