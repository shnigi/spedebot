const { Markup } = require('telegraf');
const _ = require('lodash');
const fetch = require('node-fetch');
const friendList = require('./steamFriendList');
const dota2players = require('./dota2players');
const dota2heroes = require('./dota2heroes');
const dota2Players = require('./dota2players');

const didPlayerWin = (isRadiant, didRadiantWin) => {
  if (isRadiant && didRadiantWin) {
    return '✅';
  } if (!isRadiant && !didRadiantWin) {
    return '✅';
  }
  return '❌';
};

const getRecentMatches = async () => Promise.all(friendList.map(async (friend) => {
  const url = `https://api.stratz.com/api/v1/Player/${friend.steamShortId}/matches`;
  try {
    const data = await fetch(url);
    if (data) {
      const matches = await data.json();
      if (matches && matches.length > 0) {
        return {
          name: friend.name,
          recentMatches: matches.slice(0, 6).map((match) => didPlayerWin(match.players[0].isRadiant, match.didRadiantWin)),
        };
      }
    }
  } catch {
    console.log('error');
  }
}));

const recentMatchData = async (ctx) => {
  const matches = await getRecentMatches();
  const filterUndefined = matches.filter((n) => n);
  const removeAxcer = filterUndefined.filter((match) => match.name !== 'Acxer');
  const matchData = removeAxcer.filter((n) => n);
  ctx.reply(`
${matchData.map((match) => `
${match.name}
${match.recentMatches.map((status) => `${status}`).join('')}
`).join('')}
\n`);
};

const getPlayerHeroPerformance = async () => Promise.all(friendList.map(async (friend) => {
  const url = `https://api.stratz.com/api/v1/Player/${friend.steamShortId}/heroPerformance`;
  try {
    const data = await fetch(url);
    if (data) {
      const heroPerformance = await data.json();
      const withHeroName = heroPerformance.map((hero) => ({ ...hero, heroName: dota2heroes.find((item) => item.id === hero.heroId) }));
      return {
        herodata: withHeroName.sort((a, b) => b.matchCount - a.matchCount),
        name: friend.name,
      };
    }
  } catch {
    console.log('error');
  }
}));

const calculateWinPercentage = (hero) => ((hero.winCount / hero.matchCount) * 100).toFixed(2);

const topheroes = async (ctx) => {
  const heroPerformance = await getPlayerHeroPerformance();
  const filterUndefined = heroPerformance.filter((n) => n);
  const removeAxcer = filterUndefined.filter((match) => match.name !== 'Acxer');
  const filterEmpty = removeAxcer.filter((item) => item.herodata.length > 0);
  if (filterEmpty.length === 0) {
    ctx.reply('Perhana, apirajat tulivat vastaan.');
  } else {
    ctx.replyWithMarkdown(`Top 5 herot
Ottelut | Voitot | KDA | Win%
  ${filterEmpty.map((player) => `
*${player.name}*
${player.herodata.slice(0, 5).map((hero) => `
*${hero.heroName.localized_name}* | ${hero.matchCount} | ${hero.winCount} | ${hero.kda.toFixed(2)} | ${calculateWinPercentage(hero)}%`).join('')}
`).join('')}
`);
  }
};

const getPlayerSummary = async () => Promise.all(friendList.map(async (friend) => {
  const url = `https://api.stratz.com/api/v1/Player/${friend.steamShortId}/summary`;
  try {
    const data = await fetch(url);
    if (data) {
      const summary = await data.json();
      return {
        matchCount: summary.allTime.matches.matchCount,
        win: summary.allTime.matches.win,
        name: friend.name,
      };
    }
  } catch {
    console.log('error');
  }
}));

const calculateWinPercentage2 = (player) => ((player.win / player.matchCount) * 100).toFixed(2);

const dota2matchcount = async (ctx) => {
  const heroPerformance = await getPlayerSummary();
  const filterUndefined = heroPerformance.filter((n) => n);
  const removeAxcer = filterUndefined.filter((match) => match.name !== 'Acxer');
  const filterEmpty = removeAxcer.filter((item) => item.matchCount !== 0);
  const sortMostGames = filterEmpty.sort((a, b) => b.matchCount - a.matchCount);
  if (sortMostGames.length === 0) {
    ctx.reply('Perhana, apirajat tulivat vastaan.');
  } else {
    ctx.replyWithMarkdown(`Dota 2 \nPelit | Voitot | Voittoprosentti
${sortMostGames.map((player) => `*${player.name}* | ${player.matchCount} | ${player.win} | ${calculateWinPercentage2(player)}%\n`).join('')}`);
  }
};

const sortedDota2Heroes = _.sortBy(dota2heroes, ['localized_name']);
const dota2heroesChunk = _.chunk(sortedDota2Heroes, 4);
const steamDota2Players = _.chunk(dota2players, 2);

const inlineMessageHeroes = Markup.inlineKeyboard(
    dota2heroesChunk.map((chunk) => chunk.map((hero) => Markup.button.callback(hero.localized_name, hero.localized_name))),
);

const inlineMessagePlayers = Markup.inlineKeyboard(
    steamDota2Players.map((chunk) => chunk.map((player) => Markup.button.callback(player.name, player.name))),
);

let fromChat;
let selectedPlayer;
let fromSender;

const dota2heroperformance = async (ctx) => {
    fromChat = ctx.message.chat.id;
    fromSender = ctx.message.from.username || ctx.message.from.first_name;
    ctx.telegram.sendMessage(
        ctx.message.chat.id,
        'Valitse pelaaja',
        inlineMessagePlayers,
    );
};

const dota2heroperformanceSelectHero = async (ctx, playerId) => {
    selectedPlayer = playerId;
    ctx.editMessageText(
        'Valitse hero',
        inlineMessageHeroes,
    );
};

const getHeroPerformance = async (ctx, heroId) => {
    const url = `https://api.stratz.com/api/v1/Player/${selectedPlayer}/heroPerformance/${heroId}`;
    const { localized_name } = dota2heroes.find((heroIterator) => heroId === heroIterator.id);
    const { name } = dota2Players.find((player) => selectedPlayer === player.steamShortId);
    try {
        const data = await fetch(url);
        if (data.status === 200) {
            const json = await data.json();
            const { matchCount, winCount, maxStreak, mvpCount } = json;
            const winPercentage = ((winCount / matchCount) * 100).toFixed(2);
ctx.editMessageText(`
Pelaaja: ${name}
Hero: ${localized_name}
Ottelut: ${matchCount}
Voitot: ${winCount}
Streakit: ${maxStreak}
MVP: ${mvpCount}
Voittoprosentti: ${winPercentage}%
Nappia painoi: ${fromSender}
`);
        }
    } catch {
        console.log('error');
        ctx.reply('Dataa ei tainnut löytyä, tai jotain muuta meni pieleen.');
    }
};

module.exports = {
    recentMatchData,
    topheroes,
    dota2matchcount,
    dota2heroperformance,
    dota2heroperformanceSelectHero,
    getHeroPerformance,
};
