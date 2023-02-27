const fetch = require('node-fetch');
const { intervalToDuration } = require('date-fns');
const emojis = require('./weatherEmojis');

const weather = async (ctx) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/group?id=658225,632453&lang=fi&units=metric&appid=${process.env.WEATHER_TOKEN}`,
  );
  const keli = await response.json();
  const [helsinki, vantaa] = keli.list;

  const sunriseDate = new Date(helsinki.sys.sunrise * 1000);
  const sunsetDate = new Date(helsinki.sys.sunset * 1000);

  const sunrise = Intl.DateTimeFormat('fi-FI', { timeStyle: 'short' }).format(sunriseDate);
  const sunset = Intl.DateTimeFormat('fi-FI', { timeStyle: 'short' }).format(sunsetDate);

  const { hours, minutes } = intervalToDuration({
    start: sunsetDate,
    end: sunriseDate,
  });

  const { humidity } = helsinki.main;

  ctx.reply(`
${emojis[helsinki.weather[0].id].icon} Helsingissä: ${helsinki.weather[0].description}.
Lämpötila ${helsinki.main.temp}°C
tuntuu kuin ${helsinki.main.feels_like}°C

${emojis[vantaa.weather[0].id].icon} Vantaalla: ${vantaa.weather[0].description}.
Lämpötila ${vantaa.main.temp}°C
tuntuu kuin ${vantaa.main.feels_like}°C

ilmankosteus: ${humidity}%
Aurinko nousee: ${sunrise}
Aurinko laskee: ${sunset}
Päivän pituus: ${hours}h ${minutes}min
`);
};

module.exports = weather;
