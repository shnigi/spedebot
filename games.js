const {
    pelijonnet, getAndSortMostPlayedPeople, mostPlayedGame, splitGateBasic,
} = require('./pelijonnet');
const { getPlayerSummaries, getRecentMatches } = require('./dota2_new');

const gamesToPlay = ['Sea of thievesiä', 'Phasmophobiaa', 'Dotaa', 'Apexia', 'Splitgatea', 'Groundedia'];
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
    case 'dota':
        getPlayerSummaries(ctx);
        break;
    case 'dotamatches':
        getRecentMatches(ctx);
        break;
    case 'splitgate':
        splitGateBasic(ctx);
        break;
    default:
        ctx.reply('Komento väärin, kokeile urpo uudestaan.');
    }
};

module.exports = games;
