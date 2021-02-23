require('dotenv').config();
const { Telegraf } = require('telegraf');
const sali = require('./sali');
const weather = require('./weather');
const {
  getStock,
  getAllStocks,
  getUserStocks,
  addStockToUser,
  removeStock,
  getGraafi,
} = require('./stocks');
const games = require('./games');
const sketsi = require('./sketsi');
const { pelijonnet, getAndSortMostPlayedPeople } = require('./pelijonnet');
const playSound = require('./playSound');
const getHslData = require('./hslData');
const getRoadCameras = require('./roadCameras');
const lunch = require('./lunch');
const getBeer = require('./beer');
const jolipennet = require('./trollit');
const getRandomItem = require('./arvonta');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply('Noniin pellet, meikä on botti.'));

bot.help((ctx) => ctx.reply(`
Komentoni ovat:
/help
/osake
/stocks [add, remove]
/pelit [Antaa lisäkomentoja]
/audio [numero]
/keli
/kamera [tien nimi]
/graafi [ticker]
/lounas [ravintola]
/bisse [olut]
/arvonta [lista]
osakkeet
perjantai
raketti
pim
keli
sketsi
sup
sali
pelijonnet
pelistatsit
eipelata
jolipennet
`));

bot.command('osake', (ctx) => {
  const [command, stock] = ctx.message.text.split(' ');
  if (stock && stock !== '') getStock(ctx, stock);
  else {
    ctx.reply('/osake [osaketunnus]');
  }
});

bot.command('graafi', (ctx) => {
  const [command, stock] = ctx.message.text.split(' ');
  if (stock && stock !== '') getGraafi(ctx, stock);
  else {
    ctx.reply('/graafi [osaketunnus]');
  }
});

bot.command('lounas', (ctx) => {
  const [command, restaurant] = ctx.message.text.split('/lounas');
  if (restaurant && restaurant !== '') lunch(ctx, restaurant);
  else {
    ctx.reply('/lounas [ravintola]');
  }
});

bot.command('bisse', (ctx) => {
  const [command, beer] = ctx.message.text.split('/bisse');
  if (beer && beer !== '') getBeer(ctx, beer);
  else {
    ctx.reply('/bisse [oluen nimi]');
  }
});

bot.command('arvonta', (ctx) => {
  const [command, ...rest] = ctx.message.text.split(' ');
  if (rest) getRandomItem(ctx, rest);
  else {
    ctx.reply('/arvonta [lista asioista]');
  }
});

bot.command('stocks', (ctx) => {
  const [notUsed, command, stockname] = ctx.message.text.split(' ');
  const userName = ctx.update.message.from.username;
  console.log('ctx.update.message.from', ctx.update.message.from.username);
  if (!command) getUserStocks(ctx, userName);
  else if (command === 'add' && stockname !== '') {
    addStockToUser(ctx, userName, stockname);
  } else if (command === 'remove' && stockname !== '') {
    removeStock(ctx, userName, stockname);
  } else {
    ctx.reply('Perhana, jotain meni pieleen.');
  }
});

bot.command('hsl', (ctx) => {
  const [command, name] = ctx.message.text.split(' ');
  if (name && name !== '') getHslData(ctx, name);
  else {
    ctx.reply(`
/hsl [nimi]
anders
niki
roivas
halmela
juuso
mikko
mustonen
samu
aleksi
vikman
kemi
mara
chan
`);
  }
});

bot.command('pelit', (ctx) => {
  const [command1, command] = ctx.message.text.split(' ');
  if (command && command !== '') {
    games(ctx, command);
  } else {
    ctx.reply(`
/pelit [komento]
statsit
nyt
tanaan
dota2
topheroes
summary
`);
  }
});

bot.command('audio', (ctx) => {
  const [command1, command] = ctx.message.text.split(' ');
  if (command && command !== '') {
    playSound(ctx, command);
  } else {
    ctx.reply(`
/audio [numero]
1. Aja Saatana
2. En lähde
3. En minkäänsuuruisella
4. En ole
5. Haistapaska
6. Mursupaska
7. Puhut vähän mutta asiaa
8. Pystyn vaan en pistä
9. Turpa kiinni kloppi
`);
  }
});

bot.command('keli', (ctx) => {
  const [command1, command2] = ctx.message.text.split(' ');
  if (!command2) {
    weather(ctx);
  } else {
    ctx.reply('Mursu se komento on /keli');
  }
});

bot.command('kamera', (ctx) => {
  const [command1, command2] = ctx.message.text.split(' ');
  if (!command2) {
    ctx.reply('kokeile esim. \n/kamera tornioon\n/kamera ivalo\n/kamera kehä i/\nkamera kehä ii\n/kamera kehä iii\n/kamera tampereelle\n/kamera tuusulaan');
  } else {
    getRoadCameras(ctx, command2);
  }
});

// Bot commands
bot.hears('perjantai', (ctx) => ctx.replyWithVideo({ source: './media/perjantai.mp4' }));
bot.hears('raketti', (ctx) => ctx.replyWithVideo({ source: './media/korko.mp4' }));
bot.hears('keli', (ctx) => weather(ctx));
bot.hears('sup', (ctx) => ctx.reply('Haista sinä mursu paska!'));
bot.hears('sali', (ctx) => sali(ctx));
bot.hears('pim', (ctx) => ctx.replyWithPhoto({ source: './pim.jpeg' }));
bot.hears('sketsi', (ctx) => sketsi(ctx));
bot.hears('pelijonnet', (ctx) => pelijonnet(ctx));
bot.hears('osakkeet', (ctx) => getAllStocks(ctx));
bot.hears('pelistatsit', (ctx) => getAndSortMostPlayedPeople(ctx));
bot.hears('jolipennet', (ctx) => jolipennet(ctx));
bot.hears('eipelata', (ctx) => ctx.replyWithVideo({ source: './media/eipelata.mp4' }));

// Bot alias
bot.hears('Eipelata', (ctx) => ctx.replyWithVideo({ source: './media/eipelata.mp4' }));
bot.hears('Jolipennet', (ctx) => jolipennet(ctx));
bot.hears('Perjantai', (ctx) => ctx.replyWithVideo({ source: './media/perjantai.mp4' }));
bot.hears('Raketti', (ctx) => ctx.replyWithVideo({ source: './media/korko.mp4' }));
bot.hears('Keli', (ctx) => weather(ctx));
bot.hears('Sup', (ctx) => ctx.reply('Haista sinä mursu paska!'));
bot.hears('Sali', (ctx) => sali(ctx));
bot.hears('Pim', (ctx) => ctx.replyWithPhoto({ source: './pim.jpeg' }));
bot.hears('Sketsi', (ctx) => sketsi(ctx));
bot.hears('Pelijonnet', (ctx) => pelijonnet(ctx));
bot.hears('Osakkeet', (ctx) => getAllStocks(ctx));
bot.hears('Pelistatsit', (ctx) => getAndSortMostPlayedPeople(ctx));

bot.launch();
