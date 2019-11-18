import telegram from 'node-telegram-bot-api';
import startCommand from './commands/start';
import kickCommand from './commands/kick';
import unbanCommand from './commands/unban';

let chats: Array<number> = [-12131];
let token: string = '';

let bot = new telegram(token);

startCommand(bot, chats);
kickCommand(bot, token);
unbanCommand(bot, token);
