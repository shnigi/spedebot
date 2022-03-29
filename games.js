const {
    pelijonnet, getAndSortMostPlayedPeople, mostPlayedGame, splitGateBasic,
} = require('./pelijonnet');
const {
    topheroes, dota2matchcount, dota2heroperformance,
} = require('./dota2');
const { getPlayerSummaries } = require('./dota2_new');

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
    case 'dota2':
        getPlayerSummaries(ctx);
        break;
    case 'topheroes':
        ctx.reply('Komento korjataan piakkoin');
        // topheroes(ctx);
        break;
    case 'summary':
        ctx.reply('Komento korjataan piakkoin');
        // dota2matchcount(ctx);
        break;
    case 'heroperformance':
        ctx.reply('Komento korjataan piakkoin');
        // dota2heroperformance(ctx);
        break;
    case 'splitgate':
        splitGateBasic(ctx);
        break;
    default:
        ctx.reply('Komento väärin, kokeile urpo uudestaan.');
    }
};

module.exports = games;
