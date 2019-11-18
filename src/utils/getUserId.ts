const telegram_resolver = require('tg-resolve');

let id: string;
const getUserId = (username: string, botToken: string): string => {
  telegram_resolver(botToken, username, (err: Error, res: any) => {
    if (err || res.id === undefined) {
      console.log('Error');
    } else {
      console.log('Success');
      id = res.id;
    }
  });
  return id;
};

export default getUserId;
