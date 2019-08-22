"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
var rxjs_1 = require("rxjs");
var telegram_resolver = require('tg-resolve');
var Telegram = /** @class */ (function () {
    function Telegram(bot_token) {
        this.telegram_chat_id = [-121414, -3523623623]; // chat id
        this.telegram_bot_token = '';
        if (bot_token === null || bot_token === undefined)
            throw '[ERROR] Token problems';
        this.bot = new node_telegram_bot_api_1.default(bot_token, { polling: true });
        this.telegram_bot_token = bot_token;
        this.getCommands();
    }
    Telegram.prototype.validateGroup = function (msg) {
        return this.telegram_chat_id.indexOf(msg.chat.id) > -1;
    };
    Telegram.prototype.checkMessages = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            _this.bot.on('message', function (msg) {
                if (_this.validateGroup(msg)) {
                    observer.next(msg);
                }
            });
        });
    };
    Telegram.prototype.getUserId = function (username) {
        telegram_resolver(this.telegram_bot_token, username, function (err, res) {
            if (err) {
                return 'ERROR';
            }
            else {
                if (res.id === undefined) {
                    return 'ERROR';
                }
                else {
                    var id = res.id;
                    return id;
                }
            }
        });
    };
    Telegram.prototype.getCommands = function () {
        var _this = this;
        this.bot.onText(/\/start/, function (msg, match) {
            if (_this.validateGroup(msg)) {
                _this.bot.sendMessage(msg.chat.id, 'Bot started').then(function () { console.log('[SUCCESS] Message sent'); }).catch(function () { throw '[ERROR] Message error'; });
            }
            else {
                _this.bot.sendMessage(msg.chat.id, 'This chat id is not present').then(function () { console.log('[SUCCESS] Message sent'); }).catch(function () { throw '[ERROR] Message error'; });
            }
        });
        this.bot.onText(/\/kick (.+)/, function (msg, match) {
            if (match === null) {
                _this.bot.sendMessage(msg.chat.id, 'ERROR').then(function () { console.log('[SUCCESS] Message sent'); }).catch(function () { throw '[ERROR] Message error'; });
            }
            else {
                if (_this.getUserId(match[1]) === 'ERROR') {
                    console.log('ERROR');
                }
                else {
                    _this.bot.kickChatMember(msg.chat.id, _this.getUserId(match[1])).then(function () { console.log('[SUCCESS] User kicked'); }).catch(function () { throw '[ERROR] Kick problems'; });
                }
            }
        });
        this.bot.onText(/\/unban (.+)/, function (msg, match) {
            if (match === null) {
                _this.bot.sendMessage(msg.chat.id, 'ERROR').then(function () { console.log('[SUCCESS] Message sent'); }).catch(function () { throw '[ERROR] Message error'; });
            }
            else {
                if (_this.getUserId(match[1]) === 'ERROR') {
                    console.log('ERROR');
                }
                else {
                    _this.bot.unbanChatMember(msg.chat.id, _this.getUserId(match[1])).then(function () { console.log('[SUCCESS] User unbanned'); }).catch(function () { throw '[ERROR] Unban problems'; });
                }
            }
        });
    };
    return Telegram;
}());
exports.Telegram = Telegram;
