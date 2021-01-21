require('dotenv').config();
const sali = require('./sali');
const weather = require('./weather');
const { getStock, getAllStocks } = require('./stocks');
const randomGame = require('./games');
const sketsi = require('./sketsi');
const { pelijonnet, getAndSortMostPlayedPeople } = require('./pelijonnet');
const { Telegraf } = require('telegraf')
const cron = require('node-cron');

// const cronJobs = (ctx) => {
//     ctx.reply('Noniin pellet, ajastukset päällä.');
//     cron.schedule('30 16 * * *', () => {
//         ctx.reply('Pörssi on auki. Eikun ostoksille!');
//     });
//     cron.schedule('30 16 * * 5', () => {
//         ctx.replyWithPhoto({ source: './pim.jpeg' });
//     });
// };


const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply('Noniin pellet, meikä on botti.'));


bot.help((ctx) => ctx.reply(`
Komentoni ovat:
/help
/osake osaketunnus
osakkeet
keli
pim
sketsi
sup
salille
sali
tlss
mmedf
sieni
pelit
pelijonnet
pelistatsit
`));

bot.command('osake', (ctx) => {
    const [command, stock] = ctx.message.text.split(' ');
    if (stock && stock !== '') getStock(ctx, stock);
})

// Bot commands
// bot.hears('cron', (ctx) => cronJobs(ctx));
bot.hears('keli', (ctx) => weather(ctx));
bot.hears('sup', (ctx) => ctx.reply('Haista sinä mursu paska!'));
bot.hears('salille', (ctx) => ctx.reply('Jalkapäivä, elikkäs kyykkypäivä.'));
bot.hears('sali', (ctx) => sali(ctx));
bot.hears('pim', (ctx) => ctx.replyWithPhoto({ source: './pim.jpeg' }));
bot.hears('mmedf', (ctx) => getStock(ctx, 'MMEDF'));
bot.hears('sieni', (ctx) => getStock(ctx, 'MMEDF'));
bot.hears('tlss', (ctx) => getStock(ctx, 'TLSS'));
bot.hears('pelit', (ctx) => randomGame(ctx));
bot.hears('sketsi', (ctx) => sketsi(ctx));
bot.hears('pelijonnet', (ctx) => pelijonnet(ctx));
bot.hears('osakkeet', (ctx) => getAllStocks(ctx));
bot.hears('pelistatsit', (ctx) => getAndSortMostPlayedPeople(ctx));

// Bot alias
bot.hears('Keli', (ctx) => weather(ctx));
bot.hears('Sup', (ctx) => ctx.reply('Haista sinä mursu paska!'));
bot.hears('Salille', (ctx) => ctx.reply('Jalkapäivä, elikkäs kyykkypäivä.'));
bot.hears('Sali', (ctx) => sali(ctx));
bot.hears('Pim', (ctx) => ctx.replyWithPhoto({ source: './pim.jpeg' }));
bot.hears('Mmedf', (ctx) => getStock(ctx, 'MMEDF'));
bot.hears('Sieni', (ctx) => getStock(ctx, 'MMEDF'));
bot.hears('Tlss', (ctx) => getStock(ctx, 'TLSS'));
bot.hears('Pelit', (ctx) => randomGame(ctx));
bot.hears('Sketsi', (ctx) => sketsi(ctx));
bot.hears('Pelijonnet', (ctx) => pelijonnet(ctx));
bot.hears('Osakkeet', (ctx) => getAllStocks(ctx));
bot.hears('Pelistatsit', (ctx) => getAndSortMostPlayedPeople(ctx));

bot.launch();
