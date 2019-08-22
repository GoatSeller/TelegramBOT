process.env['NTBA_FIX_319'] = '1';
import {Telegram} from './telegram'

if(!process.env['BOTTOKEN']) throw 'ERROR';
let telegram = new Telegram(process.env['BOTTOKEN'] as string);

telegram.checkMessages().subscribe(
    (next: any) => {
        console.log(next)
    },
    (error: Error) => {
        console.log(error)
    }
);