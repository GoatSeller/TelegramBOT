process.env['NTBA_FIX_319'] = '1';
import {Telegram} from './telegram'

let token: string = 'BOTTOKEN';
let telegram = new Telegram(token);

telegram.checkMessages().subscribe(
    (next: any) => {
        console.log(next)
    },
    (error: Error) => {
        console.log(error)
    }
);