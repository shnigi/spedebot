const fetch = require('node-fetch');
const { format, parse, subDays } = require('date-fns');

const formatSleepTime = (timestamp) => format(new Date(timestamp), 'HH:mm');

const ourav2 = async (ctx, token, name) => {
  const currentDate = format(new Date(), 'yyyy-MM-dd');
  const prevDate = format(subDays(new Date(), 1), 'yyyy-MM-dd');

  const urls = [
    `https://cloud.ouraring.com/v2/usercollection/daily_sleep?start_date=${currentDate}&end_date=${currentDate}`,
    `https://cloud.ouraring.com/v2/usercollection/sleep?start_date=${prevDate}&end_date=${currentDate}`,
    `https://cloud.ouraring.com/v2/usercollection/daily_readiness?start_date=${currentDate}&end_date=${currentDate}`,
    `https://cloud.ouraring.com/v2/usercollection/daily_activity?start_date=${prevDate}&end_date=${currentDate}`,
  ];
  console.log('urls', urls);
  const req = await Promise.all(
    urls.map(async (url) => {
      const resp = await fetch(url, {
        method: 'GET',
        headers: {
          Host: 'api.ouraring.com',
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      return resp.json();
    }),
  );
  console.log('req', req);

  if (req && req[0] && req[0].data) {
    // daily sleep score
    const { day, score: sleepScore } = req[0].data[0];
    const date = parse(day, 'yyyy-mm-dd', new Date());
    const formattedDate = format(date, 'dd.mm.yyyy');
    // Sleep data
    const { bedtime_start, bedtime_end } = req[1].data[0];
    // Readiness
    const { score: readiness } = req[2].data[0];
    // Activity
    const { steps } = req[3].data[0];

    ctx.replyWithMarkdown(`*${name || ''}*
*${formattedDate}*
Valmiustaso: ${readiness}
Unipisteet: ${sleepScore}
Sammu: ${formatSleepTime(bedtime_start)}
Heräs: ${formatSleepTime(bedtime_end)}
Askeleet eilen: ${steps}
`);
  } else {
    ctx.reply(req[0].message);
  }
};

module.exports = ourav2;
