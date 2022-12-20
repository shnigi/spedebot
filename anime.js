const fetch = require('node-fetch');

const searchAnime = async (ctx, animeName) => {
  const search = encodeURI(animeName.trim());
  const url = `https://api.jikan.moe/v4/anime?limit=3&q=${search}`;
  const response = await fetch(url);
  const { data } = await response.json();
  if (data) {
    ctx.reply(
      `${data
        .map(
          (anime) => `${anime.title}
Arvio: ${anime.score ?? '-'}
${anime.url}
\n`,
        )
        .join('')}`,
    );
  } else {
    ctx.reply('Animea ei löytynyt.');
  }
};

module.exports = searchAnime;
