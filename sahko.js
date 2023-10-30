const fetch = require('node-fetch');

const sahko = async (ctx) => {
  const date = new Date();
  const currentDate = date.toISOString().split('T')[0];
  const currentHour = date.getHours();
  const requestUrl = `https://api.porssisahko.net/v1/price.json?date=${currentDate}&hour=${currentHour}`;
  const upcomingPrices = 'https://api.porssisahko.net/v1/latest-prices.json';
  const response = await fetch(requestUrl);
  const json = await response.json();
  const upcomingResponse = await fetch(upcomingPrices);
  const upcomingJson = await upcomingResponse.json();
  const futurePrices = upcomingJson.prices
    .filter((item) => {
      const startDate = new Date(item.startDate);
      return startDate > date;
    })
    .reverse()
    .slice(0, 10)
    .map((item) => {
      const startDate = new Date(item.startDate);
      const formattedStartDate = startDate.toLocaleTimeString('fi-FI', {
        hour: '2-digit',
        minute: '2-digit',
      });
      return { startDate: formattedStartDate, price: item.price };
    });

  const formattedFuturePrices = futurePrices
    .map((item) => `${item.startDate} ${item.price.toFixed(3)} cnt/kwh`)
    .join('\n');

  ctx.reply(`Sähkö maksaapi ${json.price.toFixed(3)} cnt/kwh\n
Tulevat tunnit: \n${formattedFuturePrices}`);
};

module.exports = { sahko };
