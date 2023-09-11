const fetch = require('node-fetch');

const sahko = async (ctx) => {
  const date = new Date();
  const currentDate = date.toISOString().split('T')[0];
  const currentHour = date.getHours();
  const requestUrl = `https://api.porssisahko.net/v1/price.json?date=${currentDate}&hour=${currentHour}`;
  const response = await fetch(requestUrl);
  const json = await response.json();
  ctx.reply(`Sähkö maksaapi ${json.price} cnt/kwh`);
};

module.exports = { sahko };
