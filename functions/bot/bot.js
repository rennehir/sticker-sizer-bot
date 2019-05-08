const Telegraf = require('telegraf');
const sharp = require('sharp');
const axios = require('axios');
const request = require('request');

const { BOT_TOKEN, IMGUR_CLIENT_ID } = process.env;

const bot = new Telegraf(process.env.BOT_TOKEN);

const IMGUR_API_URL = 'https://api.imgur.com/3/image';
const TG_FILE_API_URL = `https://api.telegram.org/file/bot${BOT_TOKEN}/`;

bot.start(ctx =>
  ctx.replyWithMarkdown(`
*Hi there!*

I am _Sticker Sizer Bot_. Send me an image and I will do my magic and send you a properly formatted file to use as a sticker. Use the /help command to learn more.
`)
);

bot.help(ctx =>
  ctx.replyWithMarkdown(`
*Instructions*

You can always get help with the /help command.

1. Send me an image that you would like to have as a sticker.
2. I will send you back a file that is a properly formatted image.
3. Use the [Stickers Bot](https://t.me/Stickers) to create a new sticker.
4. Send it the file I sent you.
5. _Let the tarra game begin!_
`)
);

bot.on('photo', async ctx => {
  const imageArray = ctx.message.photo;
  const { file_id, width, height } = imageArray[imageArray.length - 1];
  const { file_path } = await bot.telegram.getFile(file_id);

  const aspectRatio = width / height;
  const newWidth = width >= height ? 512 : 512 / aspectRatio;
  const newHeight = height >= width ? 512 : 512 / aspectRatio;

  try {
    const url = TG_FILE_API_URL + file_path;

    request(url, { encoding: null }, async (err, res, body) => {
      const imageBuffer = await sharp(body)
        .resize(parseInt(newWidth), parseInt(newHeight))
        .png()
        .toBuffer();

      const base64Image = imageBuffer.toString('base64');

      const { data } = await axios({
        method: 'post',
        url: IMGUR_API_URL,
        headers: {
          Authorization: `Client-ID ${IMGUR_CLIENT_ID}`
        },
        data: {
          image: base64Image
        }
      });

      ctx.replyWithDocument(data.data.link);
    });
  } catch (error) {
    console.log(error);
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
