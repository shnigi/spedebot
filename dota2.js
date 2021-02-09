const fetch = require("node-fetch");
const friendList = require('./steamFriendList');

const didPlayerWin = (isRadiant, didRadiantWin) => {
 if (isRadiant && didRadiantWin) {
     return '✅'
 } else if (!isRadiant && !didRadiantWin) {
     return '✅'
 } else {
     return '❌'
 }
};

const getRecentMatches = async () => Promise.all(friendList.map(async friend => {
    const url = `https://api.stratz.com/api/v1/Player/${friend.steamShortId}/matches`;
    try {
        const data = await fetch(url);
        if (data) {
            const matches = await data.json();
            if (matches && matches.length > 0) {
                return {
                    name: friend.name,
                    recentMatches: matches.slice(0, 5).map(match =>
                         didPlayerWin(match.players[0].isRadiant, match.didRadiantWin),
                    )
                }
            }
        }
    } catch {
        console.log('error');
    }
}));

const recentMatchData = async (ctx) => {
    const matches = await getRecentMatches();
    const filterUndefined = matches.filter(n => n);
    const removeAxcer = filterUndefined.filter(match => match.name !== 'Acxer');
    const matchData = removeAxcer.filter(n => n);
        ctx.reply(`
${matchData.map(match => `
${match.name}
${match.recentMatches.map(status => `${status}`).join('')}
`).join('')}
\n`)
}

module.exports = recentMatchData;
