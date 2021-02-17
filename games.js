const { pelijonnet, getAndSortMostPlayedPeople, mostPlayedGame } = require('./pelijonnet');
const { recentMatchData, top5heroes, dota2matchcount } = require('./dota2');

const gamesToPlay = ['Sea of thievesiä', 'Phasmophobiaa'];
const randomGame = (ctx) => {
  const selectedRandomGame = gamesToPlay[Math.floor(Math.random() * gamesToPlay.length)];
  ctx.reply(`Tänään pelataan ${selectedRandomGame}.`);
};

const games = (ctx, command) => {
  switch (command) {
  case 'tanaan':
    randomGame(ctx);
    break;
  case 'nyt':
    pelijonnet(ctx);
    break;
  case 'statsit':
    getAndSortMostPlayedPeople(ctx);
    break;
  case 'eniten':
    mostPlayedGame(ctx);
    break;
  case 'dota2':
    recentMatchData(ctx);
    break;
  case 'top5heroes':
    top5heroes(ctx);
    break;
  case 'matchcount':
    dota2matchcount(ctx);
    break;
  default:
    ctx.reply('Komento väärin, kokeile urpo uudestaan.');
  }
};

module.exports = games;
