"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
process.env['NTBA_FIX_319'] = '1';
var telegram_1 = require("./telegram");
if (!process.env['BOTTOKEN'])
    throw 'ERROR';
var telegram = new telegram_1.Telegram(process.env['BOTTOKEN']);
telegram.checkMessages().subscribe(function (next) {
    console.log(next);
}, function (error) {
    console.log(error);
});
