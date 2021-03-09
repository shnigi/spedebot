const fetch = require('node-fetch');

const searchAnime = async (ctx, animeName) => {
    const search = encodeURI(animeName.trim());
    const url = `https://api.jikan.moe/v3/search/anime?q=${search}&limit=3`;
    const response = await fetch(url);
    const data = await response.json();
    if (data) {
        ctx.reply(`${data.results.map((anime) => `${anime.title}
Arvio: ${anime.score}
${anime.url}\n`).join('')}`);
    } else {
        ctx.reply('Animea ei löytynyt.');
    }
};

module.exports = searchAnime;
