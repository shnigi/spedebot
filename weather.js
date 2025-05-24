const fetch = require('node-fetch');
const { intervalToDuration } = require('date-fns');
const emojis = require('./weatherEmojis');

const weather = async (ctx, location) => {
  if (!location) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/group?id=658225,632453&lang=fi&units=metric&appid=${process.env.WEATHER_TOKEN}`
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
  }

  if (location) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&lang=fi&units=metric&appid=${process.env.WEATHER_TOKEN}`
    );
    const keli = await response.json();
    console.log('keli', keli);
    if (keli.cod === '404') {
      ctx.reply('Eipä löytynyt mestaa');
      return;
    }

    const sunriseDate = new Date(keli.sys.sunrise * 1000);
    const sunsetDate = new Date(keli.sys.sunset * 1000);

    const sunrise = Intl.DateTimeFormat('fi-FI', { timeStyle: 'short' }).format(sunriseDate);
    const sunset = Intl.DateTimeFormat('fi-FI', { timeStyle: 'short' }).format(sunsetDate);

    const { hours, minutes } = intervalToDuration({
      start: sunsetDate,
      end: sunriseDate,
    });

    const { humidity } = keli.main;

    ctx.reply(`
  ${emojis[keli.weather[0].id].icon} ${keli.name}: ${keli.weather[0].description}.
  Lämpötila ${keli.main.temp}°C
  tuntuu kuin ${keli.main.feels_like}°C

  ilmankosteus: ${humidity}%
  Aurinko nousee: ${sunrise}
  Aurinko laskee: ${sunset}
  Päivän pituus: ${hours}h ${minutes}min
  `);
  }
};

const weatherTomorrow = async (ctx, location) => {
  try {
    let lat = 60.1699;
    let lon = 24.9384;
    let locationName = 'Helsinki';

    if (location) {
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${process.env.WEATHER_TOKEN}`
      );
      const geoData = await geoResponse.json();

      if (geoData && geoData.length > 0) {
        lat = geoData[0].lat;
        lon = geoData[0].lon;
        locationName = geoData[0].name;
      } else {
        return ctx.reply('Paikkaa ei löytynyt');
      }
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=fi&appid=${process.env.WEATHER_TOKEN}`
    );

    const forecast = await response.json();

    if (!forecast) {
      return ctx.reply('Jotain meni vihkoon.');
    }

    const today = new Date();

    // Find forecast entries for the next 5 days at 12:00
    const nextDaysForecast = [...Array(5)]
      .map((_, i) => {
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + i + 1);
        const targetDateString = targetDate.toISOString().split('T')[0];

        const targetDtTxt = `${targetDateString} 12:00:00`;

        return (
          forecast.list.find(item => item.dt_txt === targetDtTxt) ||
          forecast.list.find(item => item.dt_txt.startsWith(targetDateString))
        );
      })
      .filter(Boolean);

    if (nextDaysForecast.length === 0) {
      return ctx.reply('Ei löytynyt sääennusteita tuleville päiville.');
    }

    const sunriseDate = new Date(forecast.city.sunrise * 1000);
    const sunsetDate = new Date(forecast.city.sunset * 1000);

    const sunrise = Intl.DateTimeFormat('fi-FI', {
      timeStyle: 'short',
      hour12: false,
    }).format(sunriseDate);

    const sunset = Intl.DateTimeFormat('fi-FI', {
      timeStyle: 'short',
      hour12: false,
    }).format(sunsetDate);

    const { hours, minutes } = intervalToDuration({
      start: sunriseDate,
      end: sunsetDate,
    });

    const forecastLines = nextDaysForecast.map(day => {
      const date = new Date(day.dt_txt);
      const formattedDate = Intl.DateTimeFormat('fi-FI', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      }).format(date);

      return `
${formattedDate}:
${emojis[day.weather[0].id].icon} ${day.weather[0].description}
Lämpötila: ${day.main.temp.toFixed(1)}°C
tuntuu kuin: ${day.main.feels_like.toFixed(1)}°C
Ilmankosteus: ${day.main.humidity}%
Tuuli: ${day.wind.speed.toFixed(1)} m/s`;
    });

    const message = `
Sääennuste paikkakunnalle ${locationName}:
${forecastLines.join('\n')}

Auringonnousu: ${sunrise}
Auringonlasku: ${sunset}
Päivän pituus noin: ${hours}h ${minutes}min
`;

    ctx.reply(message);
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    ctx.reply('Säätietojen hakeminen epäonnistui. Yritä myöhemmin uudelleen.');
  }
};

module.exports = { weather, weatherTomorrow };
