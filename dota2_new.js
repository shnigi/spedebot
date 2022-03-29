const { gql, GraphQLClient } = require('graphql-request');
const _ = require('lodash');
const friendList = require('./steamFriendList');
const dota2heroes = require('./dota2heroes');

const dota2PlayerIds = friendList
    .filter((player) => player.dota)
    .map((player) => player.steamShortId);

const [firstChunk, secondChunk, thirdChunk] = _.chunk(dota2PlayerIds, 5);
const endpoint = `https://api.stratz.com/graphql?jwt=${process.env.STRATZ}`;
const graphQLClient = new GraphQLClient(endpoint, {});

const query = (steamIds) => gql`
     {
       players(steamAccountIds: [${steamIds}]) {
        winCount,
        matchCount,
        steamAccount {
          realName,
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
        graphQLClient.request(query(firstChunk)),
        graphQLClient.request(query(secondChunk)),
        graphQLClient.request(query(thirdChunk)),
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

module.exports = {
    getPlayerSummaries,
};
