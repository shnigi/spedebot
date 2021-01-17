require('dotenv').config();
const { Telegraf } = require('telegraf')
const cron = require('node-cron');

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Noniin pellet, meikä on botti.'))

const sendShit = (ctx) => {
    cron.schedule('0 30 16 1/1 * ? *', () => {
        ctx.reply('Pörssi on auki. Eikun ostoksille!');
    });
};

bot.hears('sup', (ctx) => ctx.reply('Haista sinä mursu paska!'));
bot.hears('salille', (ctx) => ctx.reply('Kyykkypäivä.'));
bot.hears('ripuli', (ctx) => sendShit(ctx));


bot.launch()