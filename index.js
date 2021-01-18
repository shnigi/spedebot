require('dotenv').config();
const { Telegraf } = require('telegraf')
const cron = require('node-cron');
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


const sali = (ctx) => {
    switch (new Date().getDay()) {
    case 0:
        // day = "Sunday";
        ctx.reply('Sunnuntai, darrapäivä.');
        break;
    case 1:
        // day = "Monday";
        ctx.reply(`
Maanantai. Ylävartalo:
Penkki raskas 3-4 sarjaa, 6-12 toistoa
Soutu tangolla 3 sarjaa, 6-12 toistoa
Vinopenkki raskas 3 sarjaa, 6-12 toistoa
Olkaprässi 3 sarjaa, 6-12 toistoa
Karhunhalaus 3 sarjaa, 6-12 toistoa
Ylätalja 3 sarjaa, 6-12 toistoa
Olkapäät 2 sarjaa, 6-12 toistoa
Hauikset 2 sarjaa, 6-12 toistoa
Ojentajat 2 sarjaa, 6-12 toistoa
Vatsat 2 sarjaa, 6-12 toistoa
        `);
        break;
    case 2:
        // day = "Tuesday";
        ctx.reply(`
Tiistai. Alavartalo:
Kyykky raskas 3-4 sarjaa, 6-12 toistoa
Jalkaprässi raskas 3-4 sarjaa, 6-12 toistoa
Mave raskas 3-4 sarjaa, 6-12 toistoa
Takareisi 3-4 sarjaa, 6-12 toistoa
Pohkeet 2-3 sarjaa, 6-12 toistoa
Kumarrukset tangolla 2-3 sarjaa, 6-12 toistoa
Vatsat 3 sarjaa, 6-12 toistoa
        `);
        break;
    case 3:
        // day = "Wednesday";
        ctx.reply('Keskiviikko on lepopäivä.');
        break;
    case 4:
        // day = "Thursday";
        ctx.reply(`
Torstai. Ylävartalo:
Penkki kevyt 4 sarjaa, 8-12 toistoa
Soutu kaapelilla 3-4 sarjaa, 8-12 toistoa
Vinopenkki kevyt 3-4 sarjaa, 8-12 toistoa
Olkaprässi käsipainot 3 sarjaa, 8-12 toistoa
Karhunhalaus 3 sarjaa, 8-12 toistoa
Ylätalja 3 sarjaa, 8-12 toistoa
Olkapäät kaapeli 3 sarjaa, 8-12 toistoa
Hauikset 3 sarjaa, 8-12 toistoa
Ojentajat 3 sarjaa, 8-12 toistoa
Vatsat 3 sarjaa, 8-12 toistoa
        `);
        break;
    case 5:
        // day = "Friday";
        ctx.reply(`
Perjantai. Alavartalo:
Kyykky kevyt 3 sarjaa, 8-12 toistoa
Jalkaprässi kevyt 3 sarjaa, 8-12 toistoa
Mave kevyt 3 sarjaa, 8-12 toistoa
Takareisi 3 sarjaa, 8-12 toistoa
Pohkeet 3 sarjaa, 8-12 toistoa
Kumarrukset tangolla 3 sarjaa, 8-12 toistoa
Vatsat 3 sarjaa, 8-12 toistoa
        `);
        break;
    case 6:
        // day = "Saturday";
        console.log('PIM! Avaa kalja!');
    }
};

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply('Noniin pellet, meikä on botti.'));

const sendShit = (ctx) => {
    cron.schedule('0 30 16 1/1 * ? *', () => {
        ctx.reply('Pörssi on auki. Eikun ostoksille!');
    });
};

const stock = async (ctx, stockName) => {
    // const response = await fetch(`http://api.marketstack.com/v1/eod?access_key=${process.env.MARKETSTACK_TOKEN}&symbols=TLSS,MMEDF`)
    // const stokit = await response.json();
    // console.log('stokit', stokit);
};

// stock('kek', 'tlls');
bot.hears('keli', (ctx) => weather(ctx));
bot.hears('sup', (ctx) => ctx.reply('Haista sinä mursu paska!'));
bot.hears('salille', (ctx) => ctx.reply('Jalkapäivä, elikkäs kyykkypäivä.'));
bot.hears('sali', (ctx) => sali(ctx));
bot.hears('help', (ctx) => ctx.reply('Komentoni ovat: keli, sup, salille, sali, help, pim'));
bot.hears('ripuli', (ctx) => sendShit(ctx));
bot.hears('pim', (ctx) => ctx.replyWithPhoto({ source: './pim.jpeg' }, { caption: "PIM Avaa kalja!" }));
// bot.hears('kisu', (ctx) => ctx.sendAnimation({ id: 'CgACAgQAAxkBAAEEmj9gBWf6Xb_SjloAAVmpqy3XyTYapLwAAj8CAAIuya1R-izTBl2v-8YeBA' }));
// bot.hears('mmed', (ctx) => stock(ctx, 'mmed'));
// bot.hears('tlls', (ctx) => stock(ctx, 'tlls'));


bot.launch();
