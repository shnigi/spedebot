require('dotenv').config();
const { Telegraf } = require('telegraf');
const sali = require('./sali');
const { weather, weatherTomorrow } = require('./weather');
const tommigeneraattori = require('./tommigeneraattori');
const { aijaStory, aijaSpurdo } = require('./bjorck');
// const fitBitTommi = require('./fittommi');
// const {
// getStock,
// getAllStocks,
// getUserStocks,
// addStockToUser,
// removeStock,
// getGraafi,
// getCompany,
// } = require('./stocks');
const games = require('./games');
const sketsi = require('./sketsi');
const { pelijonnet, getAndSortMostPlayedPeople, getSplitGateBasicInfo } = require('./pelijonnet');
const playSound = require('./playSound');
// const getHslData = require('./hslData');
// const getRoadCameras = require('./roadCameras');
// const lunch = require('./lunch');
const getBeer = require('./beer');
const jolipennet = require('./trollit');
const getRandomItem = require('./arvonta');
// const { getMemes, generateMeme, showAllMemes } = require('./meme');
const searchWolfram = require('./search');
const searchMovie = require('./movie');
const searchAnime = require('./anime');
// const googleSearch = require('./googleSearch');
const { rulettiNextlevel, rulettiResults } = require('./rulettiNextlevel');
const {
  dota2heroperformanceSelectHero,
  getHeroPerformance,
  dota2heroperformanceSelectCategory,
} = require('./dota2');
const dota2players = require('./dota2players');
const dota2heroes = require('./dota2heroes');
const steamFriendList = require('./steamFriendList');
const speech = require('./speech');
const imageRecognition = require('./imageServices');
const wikipedia = require('./wikipedia');
const { generateImage, shortChat, aiVision } = require('./openai');
const { news } = require('./news');
const ourav2 = require('./ourav2');
const { getDysonClubCode } = require('./dysonclub');
const { sahko } = require('./sahko');
const { japani } = require('./japani/japani');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start(ctx => ctx.reply('Noniin pellet, meikä on botti.'));

/*
Deleted commands
/osake [ticker]
/company [ticker]
/stocks [add, remove]
/graafi [ticker]
/lounas [ravintola]
/google [hakusana tai lause]
/etsimeme [meme name / all]
/meme /id /top /bottom
/ruletti
/halmela
/life
osakkeet
sup
/kamera [tien nimi]
*/

bot.help(ctx =>
  ctx.reply(`
Komentoni ovat:
/help
/aijastoori
/aijaspurdo
/pelit [Antaa lisäkomentoja]
/audio [numero]
/keli [paikkakunta tai "tuleva" + paikkakunta]
/bisse [olut]
/arvonta [lista]
/search [hakusana tai lause]
/wikipedia [hakusana tai lause]
/anime [animen nimi]
/puhe [lause]
/movie [elokuva]
/pyssy [tyhjä tai all]
/roll (arpoo numeron 1-100)
/news
/dysonclub
/niki
/imagine [lause]
/chat [lause]
/vision [lause] + kuva
/tommismi
/eurojaska
/sahko
/piupau
perjantai
raketti
pim
tilipäivä
keli
sketsi
sali
pelijonnet
pelistatsit
eipelata
jolipennet
`)
);

// bot.command('osake', (ctx) => {
//   const [command, stock] = ctx.message.text.split(' ');
//   if (stock && stock !== '') getStock(ctx, stock);
//   else {
//     ctx.reply('/osake [osaketunnus]');
//   }
// });

bot.command('japani', ctx => japani(ctx, bot));

bot.command('wikipedia', ctx => {
  const [_, query] = ctx.message.text.split('/wikipedia');
  if (query && query !== '') wikipedia(ctx, query);
  else {
    ctx.reply('/wikipedia [hakusana]');
  }
});

bot.command('imagine', ctx => {
  const [_, query] = ctx.message.text.split('/imagine');
  if (query && query !== '') generateImage(ctx, query);
  else {
    ctx.reply('/imagine [lause]');
  }
});

bot.command('chat', ctx => {
  const [_, query] = ctx.message.text.split('/chat');
  if (query && query !== '') shortChat(ctx, query);
  else {
    ctx.reply('/chat [lause]');
  }
});

bot.command('dysonclub', ctx => getDysonClubCode(ctx));

bot.command('sahko', ctx => sahko(ctx));

bot.command('news', ctx => {
  news(ctx);
});

// bot.command('company', (ctx) => {
//   const [command, stock] = ctx.message.text.split(' ');
//   if (stock && stock !== '') getCompany(ctx, stock);
//   else {
//     ctx.reply('/company [ticker]');
//   }
// });

// bot.on('text', async (ctx) => {
//   const { text, from } = ctx.message;
//   const targetUserId = 152047241;
//   if (from.id === targetUserId && text.toLowerCase().includes('sä olet')) {
//     const splitText = text.split(/sä olet/i);

//     if (splitText.length > 1) {
//       const wordsAfterSäOlet = splitText[1].trim();

//       if (wordsAfterSäOlet) {
//         const transformedText = wordsAfterSäOlet
//           .split('')
//           .map((char, index) => (index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
//           .join('');

//         await ctx.replyWithPhoto(
//           { source: './media/spongebob.jpg' },
//           { caption: `sÄ oLeT ${transformedText}` },
//         );
//       }
//     }
//   }
// });

bot.command('roll', ctx => {
  const number = Math.floor(Math.random() * 101);
  ctx.reply(`${number}`);
});

bot.command('movie', ctx => {
  const [command, movie] = ctx.message.text.split('/movie');
  if (movie && movie !== '') searchMovie(ctx, movie);
  else {
    ctx.reply('/movie [elokuvan nimi]');
  }
});

// bot.command('google', (ctx) => {
//   const [command, searchWord] = ctx.message.text.split('/google');
//   if (searchWord && searchWord !== '') googleSearch(ctx, searchWord);
//   else {
//     ctx.reply('/google [hakusana tai lause]');
//   }
// });

bot.command('anime', ctx => {
  const [command, anime] = ctx.message.text.split('/anime');
  if (anime && anime !== '') searchAnime(ctx, anime);
  else {
    ctx.reply('/anime [animen nimi]');
  }
});

// bot.command('etsimeme', (ctx) => {
//   const [notUsed, memename] = ctx.message.text.split('/etsimeme');
//   if (memename && memename.trim() === 'all') {
//     showAllMemes(ctx);
//   } else if (memename && memename !== '') {
//     getMemes(ctx, memename.trim());
//   } else {
//     ctx.reply('/etsimeme [meemin nimi]\n/etsimeme all');
//   }
// });

// bot.command('meme', (ctx) => {
//   const [notUsed, notUsed2, id, text1, text2] = ctx.message.text.split('/');
//   if (id && text1 && text2) generateMeme(ctx, id, text1, text2);
//   else {
//     ctx.reply('/meme /id /top /bottom');
//   }
// });

// bot.command('graafi', (ctx) => {
//   const [command, stock] = ctx.message.text.split(' ');
//   if (stock && stock !== '') getGraafi(ctx, stock);
//   else {
//     ctx.reply('/graafi [osaketunnus]');
//   }
// });

// bot.command('lounas', (ctx) => {
//   const [command, restaurant] = ctx.message.text.split('/lounas');
//   if (restaurant && restaurant !== '') lunch(ctx, restaurant);
//   else {
//     ctx.reply('/lounas [ravintola]');
//   }
// });

bot.command('bisse', ctx => {
  const [command, beer] = ctx.message.text.split('/bisse');
  if (beer && beer !== '') getBeer(ctx, beer);
  else {
    ctx.reply('/bisse [oluen nimi]');
  }
});

bot.command('search', ctx => {
  const [command, searchWord] = ctx.message.text.split('/search');
  if (searchWord && searchWord !== '') searchWolfram(ctx, searchWord);
  else {
    ctx.reply('/search [hakuteksti]');
  }
});

bot.command('puhe', ctx => {
  const [_, sentence] = ctx.message.text.split('/puhe');
  if (sentence && sentence !== '') speech(ctx, sentence);
  else {
    ctx.reply('/puhe [lause]');
  }
});

bot.command('arvonta', ctx => {
  const [command, ...rest] = ctx.message.text.split(' ');
  if (rest) getRandomItem(ctx, rest);
  else {
    ctx.reply('/arvonta [lista asioista]');
  }
});

// bot.command('ruletti', (ctx) => {
//   const commands = ['😌 CLICK', '😌 CLICK', '😌 CLICK', '😌 CLICK', '😌 CLICK', 'BANG 🤯🔫'];
//   const answer = commands[Math.floor(Math.random() * commands.length)];
//   ctx.reply(answer);
// });

bot.command('pyssy', ctx => {
  const [notused, command] = ctx.message.text.split('/pyssy ');
  const userName = ctx.update.message.from.username;
  if (command === 'all') {
    rulettiResults(ctx);
  } else {
    rulettiNextlevel(ctx, userName, command);
  }
});

bot.command('niki', async ctx => {
  ourav2(ctx, process.env.NIKIOURA, 'Niki');
});

// bot.command('halmela', async (ctx) => {
//   ourav2(ctx, process.env.HALMELAOURA, 'Halmela');
// });

// bot.command('samu', async (ctx) => {
//     ouraData(ctx, process.env.SAMUOURA);
// });

// bot.command('juuso', async (ctx) => {
//     ouraData(ctx, process.env.JUUSOOURA);
// });

// bot.command('life', async (ctx) => {
//   await ourav2(ctx, process.env.NIKIOURA, 'Niki');
//   await ourav2(ctx, process.env.HALMELAOURA, 'Halmela');
//   // ouraData(ctx, process.env.JUUSOOURA, 'Juuso');
//   // ouraData(ctx, process.env.SAMUOURA, 'Samu');
// });

bot.command('tommismi', ctx => {
  tommigeneraattori(ctx);
});

// bot.command('tommi', (ctx) => {
//   fitBitTommi(ctx);
// });

const getNumberBetween = (limit, existingNumbers) => {
  const randomNumber = Math.floor(Math.random() * limit) + 1;
  if (existingNumbers.includes(randomNumber)) {
    return getNumberBetween(limit, existingNumbers);
  }
  return randomNumber;
};

bot.command('eurojaska', ctx => {
  const lottoBaseNumbers = [];
  const lottoExtraNumbers = [];
  for (let i = 0; i < 5; i++) {
    const baseNumber = getNumberBetween(50, lottoBaseNumbers);
    lottoBaseNumbers.push(baseNumber);
  }
  for (let i = 0; i < 2; i++) {
    const extraNumber = getNumberBetween(10, lottoExtraNumbers);
    lottoExtraNumbers.push(extraNumber);
  }
  const base = lottoBaseNumbers.sort((a, b) => a - b);
  const extra = lottoExtraNumbers.sort((a, b) => a - b);
  ctx.reply(`${base} - ${extra}`);
});

// bot.command('stocks', (ctx) => {
//   const [notUsed, command, stockname] = ctx.message.text.split(' ');
//   const userName = ctx.update.message.from.username;
//   console.log('ctx.update.message.from', ctx.update.message.from.username);
//   if (!command) getUserStocks(ctx, userName);
//   else if (command === 'add' && stockname !== '') {
//     addStockToUser(ctx, userName, stockname);
//   } else if (command === 'remove' && stockname !== '') {
//     removeStock(ctx, userName, stockname);
//   } else {
//     ctx.reply('Perhana, jotain meni pieleen.');
//   }
// });

// bot.command('hsl', (ctx) => {
//   const [command, name] = ctx.message.text.split(' ');
//   if (name && name !== '') getHslData(ctx, name);
//   else {
//     ctx.reply(`
// /hsl [nimi]
// anders
// niki
// roivas
// halmela
// juuso
// mikko
// mustonen
// samu
// aleksi
// vikman
// kemi
// mara
// chan
// `);
//   }
// });

bot.command('pelit', ctx => {
  const [command1, command] = ctx.message.text.split(' ');
  if (command && command !== '') {
    games(ctx, command);
  } else {
    ctx.reply(`
/pelit [komento]
statsit
nyt
dota
dotamatches
eniten
splitgate
`);
  }
});

bot.command('audio', ctx => {
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

bot.command('keli', ctx => {
  const [command1, location, point] = ctx.message.text.split(' ');
  if (!location) {
    weather(ctx);
  } else if (location === 'tuleva') {
    weatherTomorrow(ctx, point);
  } else if (command1 && location) {
    weather(ctx, location);
  } else {
    ctx.reply('Mursu se komento on /keli');
  }
});

bot.command('piupau', ctx => {
  ctx.replyWithVideo({ source: './media/piupau.mp4' });
});

// bot.command('kamera', (ctx) => {
//   const [command1, command2] = ctx.message.text.split(' ');
//   if (!command2) {
//     ctx.reply(
//       'kokeile esim. \n/kamera tornioon\n/kamera ivalo\n/kamera kehä i/\nkamera kehä ii\n/kamera kehä iii\n/kamera tampereelle\n/kamera tuusulaan',
//     );
//   } else {
//     getRoadCameras(ctx, command2);
//   }
// });

// inline button listeners
const dota2HeroCategories = ['strength', 'agility', 'mana'];
dota2players.forEach(player =>
  bot.action(player.name, ctx => dota2heroperformanceSelectCategory(ctx, player.steamShortId))
);
dota2HeroCategories.forEach(category =>
  bot.action(category, ctx => dota2heroperformanceSelectHero(ctx, category))
);
dota2heroes.forEach(hero =>
  bot.action(hero.localized_name, ctx => getHeroPerformance(ctx, hero.id))
);

const splitGatePlayers = steamFriendList.filter(friend => friend.splitgate);
splitGatePlayers.forEach(player =>
  bot.action(player.id, ctx => getSplitGateBasicInfo(ctx, player.id))
);

// Bot commands
bot.command('aijastoori', ctx => ctx.reply(aijaStory()));
bot.command('aijaspurdo', ctx => ctx.reply(aijaSpurdo()));
bot.hears('perjantai', ctx => ctx.replyWithVideo({ source: './media/perjantai.mp4' }));
bot.hears('perjantai2', ctx => ctx.replyWithVideo({ source: './media/perjantai2.mp4' }));
bot.hears('perjantai3', ctx => ctx.replyWithVideo({ source: './media/perjantai3.mp4' }));
bot.hears('perjantai4', ctx => ctx.replyWithVideo({ source: './media/perjantai4.mp4' }));
bot.hears('tilipäivä', ctx => ctx.replyWithVideo({ source: './media/tilipaiva.mp4' }));
bot.hears('raketti', ctx => ctx.replyWithVideo({ source: './media/korko.mp4' }));
bot.hears('keli', ctx => weather(ctx));
// bot.hears('sup', (ctx) => ctx.reply('Haista sinä mursu paska!'));
bot.hears('sali', ctx => sali(ctx));
bot.hears('pim', ctx => ctx.replyWithPhoto({ source: './pim.jpeg' }));
bot.hears('sketsi', ctx => sketsi(ctx));
bot.hears('pelijonnet', ctx => pelijonnet(ctx));
// bot.hears('osakkeet', (ctx) => getAllStocks(ctx));
bot.hears('pelistatsit', ctx => getAndSortMostPlayedPeople(ctx));
bot.hears('jolipennet', ctx => jolipennet(ctx));
bot.hears('eipelata', ctx => ctx.replyWithVideo({ source: './media/eipelata.mp4' }));

// Bot alias
bot.hears('Eipelata', ctx => ctx.replyWithVideo({ source: './media/eipelata.mp4' }));
bot.hears('Jolipennet', ctx => jolipennet(ctx));
bot.hears('Perjantai', ctx => ctx.replyWithVideo({ source: './media/perjantai.mp4' }));
bot.hears('Perjantai2', ctx => ctx.replyWithVideo({ source: './media/perjantai2.mp4' }));
bot.hears('Perjantai3', ctx => ctx.replyWithVideo({ source: './media/perjantai3.mp4' }));
bot.hears('Perjantai4', ctx => ctx.replyWithVideo({ source: './media/perjantai4.mp4' }));
bot.hears('Tilipäivä', ctx => ctx.replyWithVideo({ source: './media/tilipaiva.mp4' }));
bot.hears('Raketti', ctx => ctx.replyWithVideo({ source: './media/korko.mp4' }));
bot.hears('Keli', ctx => weather(ctx));
// bot.hears('Sup', (ctx) => ctx.reply('Haista sinä mursu paska!'));
bot.hears('Sali', ctx => sali(ctx));
bot.hears('Pim', ctx => ctx.replyWithPhoto({ source: './pim.jpeg' }));
bot.hears('Sketsi', ctx => sketsi(ctx));
bot.hears('Pelijonnet', ctx => pelijonnet(ctx));
// bot.hears('Osakkeet', (ctx) => getAllStocks(ctx));
bot.hears('Pelistatsit', ctx => getAndSortMostPlayedPeople(ctx));

bot.on('message', async ctx => {
  const { caption, photo } = ctx.update.message;
  if (photo && caption) {
    if (caption === 'ai') {
      const url = await ctx.telegram.getFileLink(photo[1].file_id);
      imageRecognition(ctx, url);
    }
    if (caption.startsWith('/vision')) {
      const [_, query] = caption.split('/vision');
      const imageUrl = await ctx.telegram.getFileLink(photo[1].file_id);
      aiVision(ctx, query, imageUrl);
    }
    if (caption.toLowerCase() === 'setit' && ctx.message.from.id === 152047241) {
      ctx.reply('Jumalauta Tommi, Anders suuttuu');
    }
  }
});

bot.launch();
