const games = ['Sea of thievesiä', 'Phasmophobiaa'];
const randomGame = (ctx) => {
    const selectedRandomGame = games[Math.floor(Math.random() * games.length)];
    ctx.reply(`Tänään pelataan ${selectedRandomGame}.`);
};

module.exports = randomGame;