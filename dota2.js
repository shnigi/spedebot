const fetch = require('node-fetch');
const friendList = require('./steamFriendList');
const dota2heroes = require('./dota2heroes');

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

const top5heroes = async (ctx) => {
  const heroPerformance = await getPlayerHeroPerformance();
  const filterUndefined = heroPerformance.filter((n) => n);
  const removeAxcer = filterUndefined.filter((match) => match.name !== 'Acxer');
  const filterEmpty = removeAxcer.filter((item) => item.herodata.length > 0);
  ctx.replyWithMarkdown(`Top 5 herot
Ottelut | Voitot | KDA
${filterEmpty.map((player) => `
*${player.name}*
${player.herodata.slice(0, 5).map((hero) => `
*${hero.heroName.localized_name}*
${hero.matchCount} | ${hero.winCount} | ${hero.kda.toFixed(2)}`).join('')}
`).join('')}
`);
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

const dota2matchcount = async (ctx) => {
  const heroPerformance = await getPlayerSummary();
  const filterUndefined = heroPerformance.filter((n) => n);
  const removeAxcer = filterUndefined.filter((match) => match.name !== 'Acxer');
  const filterEmpty = removeAxcer.filter((item) => item.matchCount !== 0);
  const sortMostGames = filterEmpty.sort((a, b) => b.matchCount - a.matchCount);
  console.log('filterEmpty', filterEmpty);
  ctx.replyWithMarkdown(`Dota 2 \nPelit | Voitot\n
${sortMostGames.map((player) => `*${player.name}*
${player.matchCount} | ${player.win}
`).join('')}`);
};

module.exports = {
  recentMatchData,
  top5heroes,
  dota2matchcount,
};
