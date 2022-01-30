const fetch = require('node-fetch');

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
        const { efficiency } = data[0].sleep[0];
        const sleep = getSleepTime(data[0].summary.totalMinutesAsleep);
        const [year, month, day] = data[0].sleep[0].dateOfSleep.split('-');
ctx.reply(`
${day}.${month}.${year}
Nukuttu: ${sleep}
Unen tehokkuus: ${efficiency}
Askeleet: ${data[1].summary.steps}
`);
    }
};

module.exports = fitBitTommi;
