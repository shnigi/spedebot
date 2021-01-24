const { pelijonnet, getAndSortMostPlayedPeople } = require('./pelijonnet');

const gamesToPlay = ['Sea of thievesiä', 'Phasmophobiaa'];
const randomGame = (ctx) => {
    const selectedRandomGame = gamesToPlay[Math.floor(Math.random() * gamesToPlay.length)];
    ctx.reply(`Tänään pelataan ${selectedRandomGame}.`);
};

const games = (ctx, command) => {
    switch (command) {
        case 'today':
            randomGame(ctx);
            break;
        case 'now':
            pelijonnet(ctx);
            break;
        case 'stats':
            getAndSortMostPlayedPeople(ctx);
            break;
        case 'dota2':
            ctx.reply('dota statsit coming');
            break;
        default:
            ctx.reply('Komento väärin, kokeile urpo uudestaan.');
    }
};


module.exports = games;