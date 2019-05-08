const Telegraf = require('telegraf');
const axios = require('axios');

const { BOT_TOKEN, IMGUR_CLIENT_ID } = process.env;

const bot = new Telegraf(process.env.BOT_TOKEN);

const IMGUR_API_URL = 'https://api.imgur.com/3/image';
const TG_FILE_API_URL = `https://api.telegram.org/file/bot${BOT_TOKEN}/`;

bot.hears('hi', ctx => ctx.reply('Hei vaan!'));

bot.command('kukkuu', ctx => ctx.reply('No kukkuu vittu'));

bot.on('photo', async ctx => {
  const { file_path } = await bot.telegram.getFile(
    ctx.message.photo[ctx.message.photo.length - 1].file_id
  );

  try {
    const {
      data: {
        data: { link }
      }
    } = await axios({
      method: 'post',
      url: IMGUR_API_URL,
      headers: {
        Authorization: `Client-ID ${IMGUR_CLIENT_ID}`
      },
      data: {
        image: TG_FILE_API_URL + file_path
      }
    });

    ctx.replyWithPhoto(link);
  } catch (error) {
    console.log(error.response.data);
  }
});

exports.handler = (event, context, cb) => {
  const tmp = JSON.parse(event.body);
  bot.handleUpdate(tmp);
  cb(null, {
    statusCode: 200,
    body: ''
  });
};
