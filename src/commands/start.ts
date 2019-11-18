import telegram from 'node-telegram-bot-api';
import validateGroup from '../utils/validateGroup';

const startCommand = (bot: telegram, telegramChats: Array<number>): void => {
  bot.onText(/\/start/, (msg: telegram.Message): void => {
    if (validateGroup(msg, telegramChats)) {
      bot
        .sendMessage(msg.chat.id, 'Bot started')
        .then((): void => {
          console.log('[SUCCESS] Message sent');
        })
        .catch((): void => {
          console.log('[ERROR] Message error');
        });
    } else {
      bot
        .sendMessage(msg.chat.id, 'This chat id is not present')
        .then((): void => {
          console.log('[SUCCESS] Message sent');
        })
        .catch((): void => {
          console.log('[ERROR] Message error');
        });
    }
  });
};

export default startCommand;
