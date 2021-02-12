const puppeteer = require('puppeteer');

const lunch = async (ctx, restaurant) => {
    let browser;
    if (process.env.DEV) {
      browser = await puppeteer.launch();
    } else {
      browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser' // set according to dev machine
      })
    }
    const page = await browser.newPage();
    await page.setViewport({
      width: 800,
      height: 1000,
    });
    await page.goto(`https://www.lounaat.info/haku?etsi=${restaurant}`);

    const [error] = await page.$x('//*[contains(text(), "Emme löytäneet yhtään ravintolaa")]');
    if (error) {
      console.log('error');
      ctx.reply('Ei löytynyt yhtään ravintolaa, koitas uudelleen.')
    } else {
      console.log('else');
      await page.screenshot({
        path: 'lunch.png',
      });
      await browser.close();
      ctx.replyWithPhoto({ source: './lunch.png' });
    }
};

module.exports = lunch;
