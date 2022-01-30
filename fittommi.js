const fetch = require('node-fetch');

const getSleepTime = (n) => `${n / 60 ^ 0}:` + n % 60;

const fitBitTommi = async (ctx) => {
    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0];
    const url = `https://api.fitbit.com/1.2/user/9ST245/sleep/date/${formattedDate}.json`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${process.env.FITBITTOMMI}`,
        },
    });
    const data = await response.json();
    if (data) {
        console.log('data', data);
        const { efficiency } = data.sleep[0];
        const sleep = getSleepTime(data.summary.totalMinutesAsleep);
        const [year, month, day] = data.sleep[0].dateOfSleep.split('-');
ctx.reply(`
${day}.${month}.${year}
Nukuttu: ${sleep}
Tehokkuus: ${efficiency}
`);
    }
};

module.exports = fitBitTommi;
