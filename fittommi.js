const fetch = require('node-fetch');
const moment = require('moment');

const fitBitTommi = async (ctx, name) => {
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
        const [{ sleep: [sleep], summary: sleepSummary }, { activities: [activities], summary: activitySummary }] = data;
        const { efficiency } = sleep;
        const sleepStart = moment(sleep.startTime).format('HH.mm');
        const sleepEnd = moment(sleep.endTime).format('HH.mm');
        const sleepScore = moment.utc().startOf('day').add(sleepSummary.totalMinutesAsleep, 'minutes').format('hh:mm');
        const [year, month, day] = sleep.dateOfSleep.split('-');
        const { steps } = activitySummary;

ctx.replyWithMarkdown(`
*${name || ''}*
*${day}.${month}.${year}*
Sammu: ${sleepStart}
Heräs: ${sleepEnd}
Nukuttu: ${sleepScore}
Unipisteet: ${efficiency}
Askeleet: ${steps}
`);
    }
};

module.exports = fitBitTommi;
