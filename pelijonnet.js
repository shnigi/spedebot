const fetch = require("node-fetch");

const friendList = [
    { name: 'Khalifimato', id: '76561197975718208' },
    { name: 'Mutumies', id: '76561197971446321' },
    { name: 'Jeims', id: '76561197963946575' },
    { name: 'Tumppu', id: '76561198122563689' },
    { name: 'QzQ', id: '76561197964732720' },
    { name: 'Janus', id: '76561197984441797' },
    { name: 'Nappasukeke', id: '76561198050873705' },
    { name: 'Weakki', id: '76561197979493922' },
    { name: 'Sunphinx', id: '76561197993881637' },
    { name: 'Teemu69', id: '76561197973578616' },
    { name: 'Acxer', id: '76561198021280659' },
    { name: 'Shnigi', id: '76561197975163144' },
    { name: 'Azychin', id: '76561197985803975'},
    { name: 'Tompelo', id: '76561197972246513' },
    { name: 'Tate', id: '76561197986283015' }
];

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
    const response = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.STEAM_TOKEN}&format=json&steamids=${steamIds}`)
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

module.exports = {
    pelijonnet,
    getAndSortMostPlayedPeople
};
