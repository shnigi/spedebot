const fetch = require('node-fetch');

const googleSearch = async (ctx, searchWord) => {
  const search = encodeURI(searchWord.trim());
  const url = `https://google-search3.p.rapidapi.com/api/v1/search/q=${search}&num=5`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'google-search3.p.rapidapi.com',
      'x-rapidapi-key': process.env.RAPIDAPI_GOOGLE,
    },
  });
  const data = await response.json();
  if (data && data.results && data.results.length > 1) {
    const { title, link, description } = data.results[0];
    const text1 = description !== '' ? description : title;
    ctx.reply(`${text1} - ${link}`);
  } else if (data && data.messages) {
    ctx.reply(data.messages);
  } else {
    ctx.reply('Edes google ei osaa nyt auttaa.');
  }
};

module.exports = googleSearch;
