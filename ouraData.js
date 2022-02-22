const fetch = require('node-fetch');
const moment = require('moment');

const ouraData = async (ctx, token) => {
    const date = new Date();
    const date2 = new Date();
    const formattedDateCurrentDate = date.toISOString().split('T')[0];
    date2.setDate(date.getDate() - 1);
    const formattedYesterdayDate = date2.toISOString().split('T')[0];
    const urls = [
        `https://api.ouraring.com/v1/readiness?access_token=${token}&start=${formattedYesterdayDate}&end=${formattedYesterdayDate}`,
        `https://api.ouraring.com/v1/sleep?access_token=${token}&start=${formattedYesterdayDate}&end=${formattedYesterdayDate}`,
        `https://api.ouraring.com/v1/activity?access_token=${token}&start=${formattedDateCurrentDate}&end=${formattedDateCurrentDate}`,
    ];
    const req = await Promise.all(urls.map(async (url) => {
        const resp = await fetch(url);
        return resp.json();
    }));
    if (req[0].readiness.length) {
        const [{ readiness: [readiness] }, { sleep: [sleep] }, { activity: [activity] }] = req;
        const datehack = moment(readiness.summary_date, 'YYYY-MM-DD').add(1, 'days').format('DD.MM.YYYY');
        const steps = (activity && activity.steps) || 'Ei tietoa';
ctx.reply(`${datehack}
Valmiustaso: ${readiness.score}
Unipisteet: ${sleep.score}
Nukuttu: ${(sleep.total / 60 / 60).toFixed(2)} tuntia
Askeleet: ${steps}
`);
    } else {
        ctx.reply('No eipä ole vielä avattu äppiä tältä päivältä!');
    }
};

module.exports = ouraData;
