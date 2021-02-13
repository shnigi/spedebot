const fetch = require('node-fetch');

const getStars = (rating) => {
  const stars = Math.round(rating);
  switch (stars) {
  case 1:
    return '⭐';
  case 2:
    return '⭐⭐';
  case 3:
    return '⭐⭐⭐';
  case 4:
    return '⭐⭐⭐⭐';
  case 5:
    return '⭐⭐⭐⭐⭐';
  default:
    console.log('bissehomma meni perseelleen.');
  }
};

const getBeer = async (ctx, beer) => {
  const beerName = encodeURI(beer.trim());
  const url = `https://api.untappd.com/v4/search/beer?client_id=${process.env.UNTAPPD_CLIENT_ID}&client_secret=${process.env.UNTAPPD_CLIENT_SECRET}&limit=1&q=${beerName}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.response.beers.count === 0) {
    ctx.reply('Ketuiks meni, ei löydy oluita tällä hakusanalla.');
  } else {
    const firstBeer = data.response.beers.items[0].beer;
    const beerInfoUrl = `https://api.untappd.com/v4/beer/info/${firstBeer.bid}?client_id=${process.env.UNTAPPD_CLIENT_ID}&client_secret=${process.env.UNTAPPD_CLIENT_SECRET}`;
    const infoResponse = await fetch(beerInfoUrl);
    const infoData = await infoResponse.json();
    const { beer_name, rating_score, beer_style, beer_description } = infoData.response.beer;
    ctx.reply(`${beer_name} ${getStars(rating_score)}
  Pisteet: ${rating_score.toFixed(2)}
  Tyyli: ${beer_style}
  Kuvaus: ${beer_description}`);
  }
};

module.exports = getBeer;
