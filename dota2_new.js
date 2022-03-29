const { gql, GraphQLClient } = require('graphql-request');
const _ = require('lodash');
const friendList = require('./steamFriendList');

const dota2PlayerIds = friendList
    .filter((player) => player.dota)
    .map((player) => player.steamShortId);

const [firstChunk, secondChunk, thirdChunk] = _.chunk(dota2PlayerIds, 5);
const endpoint = `https://api.stratz.com/graphql?jwt=${process.env.STRATZ}`;
const graphQLClient = new GraphQLClient(endpoint, {});

const summaryQuery = (steamIds) => gql`
     {
       players(steamAccountIds: [${steamIds}]) {
        winCount,
        matchCount,
        steamAccount {
          name,
          isDotaPlusSubscriber,
          isAnonymous,
          smurfFlag,
        }
       }
     }
`;

const getPlayerSummaries = async (ctx) => {
    const data = await Promise.all([
        graphQLClient.request(summaryQuery(firstChunk)),
        graphQLClient.request(summaryQuery(secondChunk)),
        graphQLClient.request(summaryQuery(thirdChunk)),
    ]);
    const [first, second, third] = data;
    const playerData = [...first.players, ...second.players, ...third.players].flat();
    ctx.reply(`${playerData.map((player) =>
`${player?.steamAccount?.name}
Anonyymi: ${player.steamAccount.isAnonymous ? 'Kyllä' : 'Ei'} ${!player.steamAccount.isAnonymous ? `
Pelejä: ${player.matchCount}
Voitot: ${player.winCount}
Voittoprosentti: ${((player.winCount / player.matchCount) * 100).toFixed(2)}%
Dotaplus tilaaja: ${player?.steamAccount?.isDotaPlusSubscriber ? 'Kyllä' : 'Ei'}` : ''}

`).join('')}`);
};

const recentMatchesQuery = (steamId) => gql`
  {
  player(steamAccountId: ${steamId}) {
    steamAccount {
      name,
      isAnonymous
    },
    matches(request: {isParsed: true, take: 5}) {
      didRadiantWin,
      durationSeconds,
      gameMode,
      players(steamAccountId: ${steamId}) {
      isVictory,
      isRadiant,
      heroId,
      hero {
        displayName,
      }
      kills,
      deaths,
      assists,
      networth,
      role,
    }
    },
  }
}
`;
const getRecentMatches = async (ctx) => {
    const data = await Promise.all(dota2PlayerIds.map(async (playerId) => graphQLClient.request(recentMatchesQuery(playerId))));
    // const data = await Promise.all([graphQLClient.request(recentMatchesQuery('15452480')), graphQLClient.request(recentMatchesQuery('11180593'))]);
    ctx.reply(data.map((gamer) => `
Pelaaja: ${gamer.player.steamAccount.name}
${!gamer.player.steamAccount.isAnonymous ? `Ottelut: ${gamer.player.matches.map((match) => `${match.players[0].isVictory ? '✅' : '❌'}`).join('')}` : 'Anonyymi'}
`).join(''));
};

module.exports = {
    getPlayerSummaries,
    getRecentMatches,
};
