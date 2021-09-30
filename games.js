const { pelijonnet, getAndSortMostPlayedPeople, mostPlayedGame } = require('./pelijonnet');
const { recentMatchData, topheroes, dota2matchcount, dota2heroperformance } = require('./dota2');

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
    case 'topheroes':
        topheroes(ctx);
        break;
    case 'summary':
        dota2matchcount(ctx);
        break;
    case 'heroperformance':
        dota2heroperformance(ctx);
        break;
    default:
        ctx.reply('Komento väärin, kokeile urpo uudestaan.');
    }
};

module.exports = games;
