const puppeteer = require('puppeteer');

const lunch = async (ctx, restaurant) => {
  const restaurantName = encodeURI(restaurant.trim());
  let browser;
  if (process.env.DEV) {
    browser = await puppeteer.launch();
  } else {
    browser = await puppeteer.launch({
      executablePath: '/usr/bin/chromium-browser', // set according to dev machine
    });
  }
  const page = await browser.newPage();
  await page.setViewport({
    width: 800,
    height: 1000,
  });
  await page.goto(`https://www.lounaat.info/haku?etsi=${restaurantName}`);

  const [error] = await page.$x('//*[contains(text(), "Emme löytäneet yhtään ravintolaa")]');
  if (error) {
    ctx.reply('Ei löytynyt yhtään ravintolaa, koitas uudelleen.');
  } else {
    await page.screenshot({
      path: 'lunch.png',
    });
    await browser.close();
    ctx.replyWithPhoto({ source: './lunch.png' });
  }
};

module.exports = lunch;
