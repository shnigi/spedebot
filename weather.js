const fetch = require("node-fetch");

const weather = async (ctx) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/group?id=658225,632453&lang=fi&units=metric&appid=${process.env.WEATHER_TOKEN}`)
    const keli = await response.json();
    const [helsinki, vantaa] = keli.list;
    ctx.reply(`
Helsingissä tänään: ${helsinki.weather[0].description}. Lämpötila on ${helsinki.main.temp}°C ja tuntuu kuin ${helsinki.main.feels_like}°C
Vantaalla tänään: ${vantaa.weather[0].description}. Lämpötila on ${vantaa.main.temp}°C ja tuntuu kuin ${vantaa.main.feels_like}°C
`);
}

module.exports = weather;