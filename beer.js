const fetch = require('node-fetch');

const getBeer = async (ctx, beer) => {
  const beerName = encodeURI(beer.trim());
  const url = `https://api.untappd.com/v4/search/beer?client_id=${process.env.UNTAPPD_CLIENT_ID}&client_secret=${process.env.UNTAPPD_CLIENT_SECRET}&limit=1&q=${beerName}`;
  const response = await fetch(url);
  const data = await response.json();
  const firstBeer = data.response.beers.items[0].beer;
  const beerInfoUrl = `https://api.untappd.com/v4/beer/info/${firstBeer.bid}?client_id=${process.env.UNTAPPD_CLIENT_ID}&client_secret=${process.env.UNTAPPD_CLIENT_SECRET}`;
  const infoResponse = await fetch(beerInfoUrl);
  const infoData = await infoResponse.json();
  const { beer_name, rating_score } = infoData.response.beer;
  ctx.reply(`${beer_name} ${rating_score.toFixed(2)} tähteä.`);
};

module.exports = getBeer;
