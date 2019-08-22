import telegram from 'node-telegram-bot-api';
import { Observable } from 'rxjs';
const telegram_resolver = require('tg-resolve');

export default class Telegram extends telegram {
    private telegram_chat_id: Array<string | number> = [-121414, -3523623623]; // chat id
    private telegram_bot_token: string = '';

    constructor(bot_token: string) {
        super (bot_token, { polling: true })
        if (bot_token === null || bot_token === undefined) throw '[ERROR] Token problems';
        this.telegram_bot_token = bot_token;
        this.getCommands();
    }

    validateGroup(msg: telegram.Message): boolean {
       return this.telegram_chat_id.indexOf(msg.chat.id) > -1
    }


    checkMessages(): Observable<any> {
        return new Observable<any>(observer => {
            super.on('message',(msg: telegram.Message) => {
                if (this.validateGroup(msg)) {
                    observer.next(msg)
                }
            });
        });
    }

    getUserId(username: string): any {
        telegram_resolver(this.telegram_bot_token, username, (err: any, res: any) => {
            if (err) {
                return 'ERROR'
            } else {
                if (res.id === undefined) {
                    return 'ERROR'
                } else {
                    const id: string = res.id;
                    return id
                }
            }
        })
    }

    getCommands(): any {
        super.onText(/\/start/, (msg: telegram.Message, match: RegExpExecArray | null) => {
            if (this.validateGroup(msg)) {
                super.sendMessage(msg.chat.id, 'Bot started').then(() => { console.log('[SUCCESS] Message sent')}).catch(() => { throw '[ERROR] Message error'})
            } else {
                super.sendMessage(msg.chat.id, 'This chat id is not present').then(() => { console.log('[SUCCESS] Message sent')}).catch(() => { throw '[ERROR] Message error'})
            }

        });

        super.onText(/\/kick (.+)/, (msg: telegram.Message, match: RegExpExecArray | null) => {
            if (match === null) {
                super.sendMessage(msg.chat.id, 'ERROR').then(() => { console.log('[SUCCESS] Message sent')}).catch(() => { throw '[ERROR] Message error'})
            } else {
                if(this.getUserId(match[1]) === 'ERROR') {
                    console.log('ERROR')
                } else {
                    super.kickChatMember(msg.chat.id, this.getUserId(match[1])).then(() => { console.log('[SUCCESS] User kicked')}).catch(() => { throw '[ERROR] Kick problems' })
                }
            }
        });

        super.onText(/\/unban (.+)/, (msg: telegram.Message, match: RegExpExecArray | null) => {
            if (match === null) {
                super.sendMessage(msg.chat.id, 'ERROR').then(() => { console.log('[SUCCESS] Message sent')}).catch(() => { throw '[ERROR] Message error'})
            } else {
                if(this.getUserId(match[1]) === 'ERROR') {
                    console.log('ERROR')
                } else {
                    super.unbanChatMember(msg.chat.id, this.getUserId(match[1])).then(() => { console.log('[SUCCESS] User unbanned')}).catch(() => { throw '[ERROR] Unban problems' })
                }
            }
        });

    }


}