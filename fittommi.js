const fetch = require('node-fetch');
const moment = require('moment');

const getSleepTime = (n) => `${n / 60 ^ 0}:` + n % 60;

const fitBitTommi = async (ctx) => {
    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0];
    const urls = [
        `https://api.fitbit.com/1.2/user/9ST245/sleep/date/${formattedDate}.json`,
        `https://api.fitbit.com/1.2/user/9ST245/activities/date/${formattedDate}.json`,
    ];
    const data = await Promise.all(urls.map(async (url) => {
        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${process.env.FITBITTOMMI}`,
            },
        });
        return resp.json();
    }));

    if (data) {
        const [{ sleep: [sleep] }, { activities: [activities] }] = data;
        const { efficiency } = sleep;
        const sleepStart = moment(sleep.startTime).format('HH.mm');
        const sleepEnd = moment(sleep.endTime).format('HH.mm');
        const { steps, calories } = activities;
        const sleptHours = getSleepTime(data[0].summary.totalMinutesAsleep);
        const [year, month, day] = sleep.dateOfSleep.split('-');
ctx.reply(`
${day}.${month}.${year}
Nukuttu: ${sleptHours}
Unen tehokkuus: ${efficiency}
Unille: ${sleepStart}
Herätys: ${sleepEnd}
Askeleet: ${steps}
Aktiivisetkalorit: ${calories}
`);
    }
};

module.exports = fitBitTommi;
