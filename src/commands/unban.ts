import telegram from 'node-telegram-bot-api';
import getUserId from '../utils/getUserId';

const unbanCommand = (bot: telegram, botToken: string): void => {
  bot.onText(
    /\/unban (.+)/,
    (msg: telegram.Message, match: RegExpExecArray | null): void => {
      if (match === null) {
        bot
          .sendMessage(msg.chat.id, 'ERROR')
          .then((): void => {
            console.log('[SUCCESS] Message sent');
          })
          .catch((): void => {
            console.log('[ERROR] Message error');
          });
      } else {
        if (getUserId(match[1], botToken) === 'ERROR') {
          console.log('ERROR');
        } else {
          bot
            .unbanChatMember(msg.chat.id, getUserId(match[1], botToken))
            .then((): void => {
              console.log('[SUCCESS] User unbanned');
            })
            .catch((): void => {
              console.log('[ERROR] Unban problems');
            });
        }
      }
    }
  );
};

export default unbanCommand;
