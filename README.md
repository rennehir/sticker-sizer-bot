[![Netlify Status](https://api.netlify.com/api/v1/badges/5feb88db-a0e9-40a7-be4f-cc61d950b774/deploy-status)](https://app.netlify.com/sites/sticker-sizer-bot/deploys)

# Sticker sizer bot for Telegram

Telegram bot that sizes images so that they can be used as stickers. Add [StickerSizerBot](https://t.me/StickerSizerBot) on Telegram and startt using it :)

## Motivation

A short description of the motivation behind the creation and maintenance of the project. This should explain why the project exists.

## Screenshots

![Screenshot](https://raw.githubusercontent.com/rennehir/sticker-sizer-bot/master/docs/screenshot_1.jpg)

## Built with

- [NodeJS](https://nodejs.org/en/) - JavaScript Runtime
- [Telegraf](https://github.com/telegraf/telegraf) - Modern Telegram Bot Framework for Node.js
- [Lipo](https://github.com/lipojs/lipo) - Free image manipulation API service built on top of Sharp
- [Imgur](https://apidocs.imgur.com/) - The magic of the Internet

## Features

Send the bot an image file and it sends you back a file with a longest side of 512px. And it formats it to a PNG. Exactly what the [Stickers](https://t.me/Stickers) bot needs :)

## Installation

### Prerequisites

First you need to install [Node](https://nodejs.org/en/). In order to run the development environment you need to have an account on [Netlify](https://www.netlify.com/) and install the CLI tool: `npm install -g netlify-cli`

You also need to sign up on [Imgur](https://imgur.com/) and create a new application in order to retrieve a client id that is used to make API calls.

### Clone the repo

`git clone https://github.com/rennehir/sticker-sizer-bot.git`

### Initialize a new Netlify project

`netlify init`

Choose to create a new project. You might need to login the first time.

### Set environment variables

`netlify open`

The above command should open your project in the browser. Then navigate to Deploys –> Deploy settings –> Environment

Add two env variables, BOT_TOKEN and IMGUR_CLIENT_ID. You can retrieve a bot token from [BotFather](https://t.me/BotFather) and the Imgur client ID from your Imgur dashboard after you have created an application.

### Install dependencies

`yarn`

### Run the dev environment

`netlify run --live`

### Set webhooks

In order to make the bot respond to your messages, you need set a webhook. You can do it by visiting following URL:

`https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=<NETLIFY-LIVE-URL>/.netlify/functions/bot`

Remember to replace the placeholders. You can find the Netlify live URL from your terminal.

### Try the bot

Now everything should be working.

## Contribute

You are more than welcome to contribute in any way. Submit an issue if something doesn't work. If you want to fix something or enhance the bot, please make a pull request :)

## License

This project is licensed under the [MIT license](https://raw.githubusercontent.com/rennehir/sticker-sizer-bot/master/LICENSE.md).

MIT © Renne Hirsimäki
