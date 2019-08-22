"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
process.env['NTBA_FIX_319'] = '1';
var telegram_1 = require("./telegram");
var token = 'BOTTOKEN';
var telegram = new telegram_1.Telegram(token);
telegram.checkMessages().subscribe(function (next) {
    console.log(next);
}, function (error) {
    console.log(error);
});
