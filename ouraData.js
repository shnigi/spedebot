const fetch = require('node-fetch');

const ouraData = async (ctx, token) => {
    const urls = [
        `https://api.ouraring.com/v1/readiness?access_token=${token}`,
        `https://api.ouraring.com/v1/sleep?access_token=${token}`,
    ];
    const req = await Promise.all(urls.map(async (url) => {
        const resp = await fetch(url);
        return resp.json();
    }));
    const [readiness] = req[0].readiness.reverse();
    const [sleep] = req[1].sleep.reverse();
    ctx.reply(`${readiness.summary_date.split('-').reverse().join('.')}
Valmiustaso: ${readiness.score}
Unipisteet: ${sleep.score}
Nukuttu: ${(sleep.total / 60 / 60).toFixed(2)} tuntia
`);
};

module.exports = ouraData;
