require('dotenv').config();
const sali = require('./sali');
const weather = require('./weather');
const { getStock } = require('./stocks');
const randomGame = require('./games');
const sketsi = require('./sketsi');
const { Telegraf } = require('telegraf')
const cron = require('node-cron');

const cronJobs = (ctx) => {
    ctx.reply('Noniin pellet, ajastukset päällä.');
    cron.schedule('30 16 * * *', () => {
        ctx.reply('Pörssi on auki. Eikun ostoksille!');
    });
    cron.schedule('30 16 * * 5', () => {
        ctx.replyWithPhoto({ source: './pim.jpeg' });
    });
};


const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply('Noniin pellet, meikä on botti.'));


bot.help((ctx) => ctx.reply(`
Komentoni ovat:
keli
sup
salille
sali
help
pim
tlss
mmedf
sieni
(cron: ajastetut tehtävät)`));

bot.command('osake', (ctx) => {
    const [command, stock] = ctx.message.text.split(' ');
    if (stock && stock !== '') getStock(ctx, stock);
})

// Bot commands
bot.hears('keli', (ctx) => weather(ctx));
bot.hears('sup', (ctx) => ctx.reply('Haista sinä mursu paska!'));
bot.hears('salille', (ctx) => ctx.reply('Jalkapäivä, elikkäs kyykkypäivä.'));
bot.hears('sali', (ctx) => sali(ctx));
bot.hears('cron', (ctx) => cronJobs(ctx));
bot.hears('pim', (ctx) => ctx.replyWithPhoto({ source: './pim.jpeg' }));
bot.hears('mmedf', (ctx) => getStock(ctx, 'MMEDF'));
bot.hears('sieni', (ctx) => getStock(ctx, 'MMEDF'));
bot.hears('tlss', (ctx) => getStock(ctx, 'TLSS'));
bot.hears('pelit', (ctx) => randomGame(ctx));
bot.hears('sketsi', (ctx) => sketsi(ctx));

// Bot alias
bot.hears('Keli', (ctx) => weather(ctx));
bot.hears('Sup', (ctx) => ctx.reply('Haista sinä mursu paska!'));
bot.hears('Salille', (ctx) => ctx.reply('Jalkapäivä, elikkäs kyykkypäivä.'));
bot.hears('Sali', (ctx) => sali(ctx));
bot.hears('Cron', (ctx) => cronJobs(ctx));
bot.hears('Pim', (ctx) => ctx.replyWithPhoto({ source: './pim.jpeg' }, { caption: "PIM Avaa kalja!" }));
bot.hears('Mmedf', (ctx) => getStock(ctx, 'MMEDF'));
bot.hears('Sieni', (ctx) => getStock(ctx, 'MMEDF'));
bot.hears('Tlss', (ctx) => getStock(ctx, 'TLSS'));
bot.hears('Pelit', (ctx) => randomGame(ctx));
bot.hears('Sketsi', (ctx) => sketsi(ctx));

bot.launch();
