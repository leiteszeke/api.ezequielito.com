// import { prisma } from '../config/database';
// import Slack from '../models/Slack';

const SendSlackMessage = async () => {
  /*
  const randomSales = await prisma.$queryRaw<{ id: number }[]>`
    SELECT * FROM Sale ORDER BY RAND() LIMIT 1
  `;
  const saleId = randomSales[0].id;

  Slack.sendNewSaleMessage(saleId);

  const randomOpenSession = await prisma.$queryRaw<{ id: number }[]>`
    SELECT * FROM CashRegisterSession WHERE closedAt IS NULL ORDER BY RAND() LIMIT 1
  `;
  const sessionId = randomOpenSession[0].id;

  Slack.sendOpenRegisterMessage(sessionId);

  const randomCloseSession = await prisma.$queryRaw<{ id: number }[]>`
    SELECT * FROM CashRegisterSession WHERE closedAt IS NOT NULL ORDER BY RAND() LIMIT 1
  `;
  const sessionId = randomCloseSession[0].id;

  Slack.sendCloseRegisterMessage(sessionId);

  const randomTransactions = await prisma.$queryRaw<{ id: number }[]>`
    SELECT * FROM CashRegisterTransaction WHERE type = 'AddMoney' AND description <> 'Apertura de Caja' ORDER BY RAND() LIMIT 1
  `;
  const transactionId = randomTransactions[0].id;

  Slack.sendAddMoneyMessage(transactionId);

  const randomTransactions = await prisma.$queryRaw<{ id: number }[]>`
    SELECT * FROM CashRegisterTransaction WHERE type = 'WithdrawMoney' ORDER BY RAND() LIMIT 1
  `;
  const transactionId = randomTransactions[0].id;

  Slack.sendWithdrawMoneyMessage(transactionId);
  */
};

export default SendSlackMessage;
