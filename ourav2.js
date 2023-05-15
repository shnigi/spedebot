const fetch = require('node-fetch');
const { format, parse, subDays, intervalToDuration, parseISO } = require('date-fns');

const formatSleepTime = (timestamp) => format(new Date(timestamp), 'HH:mm');

const ourav2 = async (ctx, token, name) => {
  const currentDate = format(new Date(), 'yyyy-MM-dd');
  console.log('currentDate', currentDate);
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

  if (
    req &&
    req[0] &&
    req[0].data.length &&
    req[1] &&
    req[1].data.length &&
    req[2] &&
    req[2].data.length &&
    req[3] &&
    req[3].data.length
  ) {
    // daily sleep score
    const { day, score: sleepScore } = req[0].data[0];
    const date = parse(day, 'yyyy-mm-dd', new Date());
    const formattedDate = format(date, 'dd.mm.yyyy');
    // Sleep data
    const sleepArray = req[1].data.find(
      (item) => item.type === 'long_sleep' && item.day === currentDate,
    );
    const { bedtime_start, bedtime_end, total_sleep_duration } = sleepArray;
    const timeinBed = intervalToDuration({
      start: parseISO(bedtime_start),
      end: parseISO(bedtime_end),
    });
    const slept = intervalToDuration({ start: 0, end: total_sleep_duration * 1000 });
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
Pötkötelty: ${timeinBed.hours}h ${timeinBed.minutes}min
Nukuttu: ${slept.hours}h ${slept.minutes}min
Askeleet eilen: ${steps}
`);
  } else if (req[0].message) {
    ctx.reply(req[0].message);
  } else {
    ctx.reply('Eipä ole avattu äppiä ja API päivittämättä, tai jotain muuta meni pieleen');
  }
};

module.exports = ourav2;
