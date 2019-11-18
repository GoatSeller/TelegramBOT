import telegram from "node-telegram-bot-api";

const validateGroup = (msg: telegram.Message, telegramChats: any): boolean => {
    return telegramChats.indexOf(msg.chat.id) > -1;
};

export default validateGroup;
