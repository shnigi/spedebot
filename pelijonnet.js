const fetch = require("node-fetch");
const friendList = require('./steamFriendList');

const steamIds = friendList.map(({id}) =>  id).join(',');

const getRecentGames = async () => Promise.all(friendList.map(async friend => {
    const url = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${process.env.STEAM_TOKEN}&steamid=${friend.id}&format=json&include_appinfo=1&include_played_free_games=1`;
    const data = await fetch(url);
    const recentGames = await data.json();
    return {
        recentGames: recentGames.response.games,
        name: friend.name,
    }
}));

const getAndSortMostPlayedPeople = async (ctx) => {
    const recentGames = await getRecentGames();
    const gameTimes = recentGames
        .filter(games => games.recentGames !== undefined)
        .map(player => ({
        name: player.name,
        totalPlaytime: player.recentGames.reduce((acc, b) => acc + b.playtime_2weeks, 0),
        recentGames: player.recentGames
    }))
    .sort((a, b) => b.totalPlaytime - a.totalPlaytime);

ctx.reply(`
Eniten pelanneet 2 viikon aikana: ${gameTimes.map(player => `
${player.name} - ${(player.totalPlaytime / 60).toFixed(2)} Tuntia`).join('')}
`)
};

const pelijonnet = async (ctx) => {
    const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.STEAM_TOKEN}&format=json&steamids=${steamIds}`;
    const response = await fetch(url)
    const players = await response.json();

    const online = players.response.players.filter(player => player.personastate === 1 && player.gameid)

    if (online.length === 0) {
        ctx.reply('Ei ketään pelaamassa 🙁');
    } else {
        ctx.reply(`
    Peleillä on: ${online.map(player => `
    ${player.personaname} - ${player.gameextrainfo}`).join('')}
    `)
    }
};

const mostPlayedGame = async (ctx) => {
    const recentGames = await getRecentGames();
    const mostPlayedGame = recentGames
        .filter(games => games.recentGames !== undefined)
        .map(player => ({
            name: player.name,
            mostPlayedGames: player.recentGames.sort((a, b) => b.totalPlaytime - a.totalPlaytime)
        }))
       
    ctx.reply(`
Eniten pelatut pelit 2 viikon aikana: ${mostPlayedGame.map(player => `
${player.name} - ${player.mostPlayedGames[0].name}`).join('')}
`)
};

module.exports = {
    pelijonnet,
    getAndSortMostPlayedPeople,
    mostPlayedGame,
};
