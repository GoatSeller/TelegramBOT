import telegram from 'node-telegram-bot-api';
import { Observable } from 'rxjs';
const telegram_resolver = require('tg-resolve');

export class Telegram {
  private bot: telegram;
  private telegram_chat_id: Array<string | number> = [-121414, -3523623623]; // chat id
  private telegram_bot_token: string = '';

  constructor(bot_token: string) {
    if (bot_token === null || bot_token === undefined)
      throw '[ERROR] Token problems';
    this.bot = new telegram(bot_token, { polling: true });
    this.telegram_bot_token = bot_token;
    this.getCommands();
  }

  validateGroup(msg: telegram.Message): boolean {
    return this.telegram_chat_id.indexOf(msg.chat.id) > -1;
  }

  checkMessages(): Observable<any> {
    return new Observable<any>(observer => {
      this.bot.on('message', (msg: telegram.Message) => {
        if (this.validateGroup(msg)) {
          observer.next(msg);
        }
      });
    });
  }

  getUserId(username: string): any {
    telegram_resolver(
      this.telegram_bot_token,
      username,
      (err: any, res: any) => {
        if (err) {
          return 'ERROR';
        } else {
          if (res.id === undefined) {
            return 'ERROR';
          } else {
            const id: string = res.id;
            return id;
          }
        }
      }
    );
  }

  getCommands(): any {
    this.bot.onText(
      /\/start/,
      (msg: telegram.Message, match: RegExpExecArray | null) => {
        if (this.validateGroup(msg)) {
          this.bot
            .sendMessage(msg.chat.id, 'Bot started')
            .then(() => {
              console.log('[SUCCESS] Message sent');
            })
            .catch(() => {
              throw '[ERROR] Message error';
            });
        } else {
          this.bot
            .sendMessage(msg.chat.id, 'This chat id is not present')
            .then(() => {
              console.log('[SUCCESS] Message sent');
            })
            .catch(() => {
              throw '[ERROR] Message error';
            });
        }
      }
    );

    this.bot.onText(
      /\/kick (.+)/,
      (msg: telegram.Message, match: RegExpExecArray | null) => {
        if (match === null) {
          this.bot
            .sendMessage(msg.chat.id, 'ERROR')
            .then(() => {
              console.log('[SUCCESS] Message sent');
            })
            .catch(() => {
              throw '[ERROR] Message error';
            });
        } else {
          if (this.getUserId(match[1]) === 'ERROR') {
            console.log('ERROR');
          } else {
            this.bot
              .kickChatMember(msg.chat.id, this.getUserId(match[1]))
              .then(() => {
                console.log('[SUCCESS] User kicked');
              })
              .catch(() => {
                throw '[ERROR] Kick problems';
              });
          }
        }
      }
    );

    this.bot.onText(
      /\/unban (.+)/,
      (msg: telegram.Message, match: RegExpExecArray | null) => {
        if (match === null) {
          this.bot
            .sendMessage(msg.chat.id, 'ERROR')
            .then(() => {
              console.log('[SUCCESS] Message sent');
            })
            .catch(() => {
              throw '[ERROR] Message error';
            });
        } else {
          if (this.getUserId(match[1]) === 'ERROR') {
            console.log('ERROR');
          } else {
            this.bot
              .unbanChatMember(msg.chat.id, this.getUserId(match[1]))
              .then(() => {
                console.log('[SUCCESS] User unbanned');
              })
              .catch(() => {
                throw '[ERROR] Unban problems';
              });
          }
        }
      }
    );
  }
}
