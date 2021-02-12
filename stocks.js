const fetch = require("node-fetch");
const fs = require("fs");
const puppeteer = require('puppeteer');

const getStockSuggestions = async (ctx, stockName) => {
    const url = `https://finance.yahoo.com/_finance_doubledown/api/resource/searchassist;searchTerm=${stockName}`;
    const response = await fetch(url);
    const symbolSuggests = await response.json();
    const { items } = symbolSuggests;
    if ( items && items.length === 0 ) {
        ctx.reply('En osaa ehdottaa mitään, kokeile urpo uudestaan.');
    } else {
    ctx.reply(`Osaketta ei löydy, olisiko se joku näistä?
${items.map(stock => `${stock.symbol} \n`).join('')}
    `);
    }
}
const getStock = async (ctx, stockName) => {
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?lang=en-US&region=US&corsDomain=finance.yahoo.com&symbols=${stockName}`;
    const response = await fetch(url);
    const stokit = await response.json();
    if (stokit.quoteResponse.result.length === 0) {
        getStockSuggestions(ctx, stockName);
    } else {
        const [currentValue] = stokit.quoteResponse.result;
        const symbol = currentValue.symbol;
        const regularMarketPrice = (currentValue && currentValue.regularMarketPrice ) && `${currentValue.regularMarketPrice}$` || 'Hinta ei tiedossa';
        const regularMarketChangePercent = currentValue && currentValue.regularMarketChangePercent && `${currentValue.regularMarketChangePercent.toFixed(2)}%` || 'Ei tiedossa';
        ctx.reply(`
${symbol}: ${regularMarketPrice}
Muutos: ${regularMarketChangePercent}
`);
    }
};

const getGraafi = async (ctx, stockName) => {
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?lang=en-US&region=US&corsDomain=finance.yahoo.com&symbols=${stockName}`;
    const response = await fetch(url);
    const stokit = await response.json();
    if (stokit.quoteResponse.result.length === 0) {
        getStockSuggestions(ctx, stockName);
    } else {
        // const browser = await puppeteer.launch();
        const browser = await puppeteer.launch({
            executablePath: '/usr/bin/chromium-browser' // set according to dev machine
        })
        const page = await browser.newPage();
        await page.goto(`https://finance.yahoo.com/quote/${stockName}`);
        await page.click('button[name="agree"]');
        await page.waitForNavigation();
        await page.waitForSelector('#quote-header');
        await page.waitForTimeout(2000);
        await page.screenshot({
            path: 'stock.png',
            clip: { x: 0, y: 510, width: 640, height: 270 }
        });
        await browser.close();
        ctx.replyWithPhoto({ source: './stock.png' });
    }
};

const getAllStocks = async (ctx) => {
    const response = await fetch(`https://query1.finance.yahoo.com/v7/finance/quote?lang=en-US&region=US&corsDomain=finance.yahoo.com&symbols=tlss,mmedf,AVGR,GME,HYLN,pltr`)
        const stokit = await response.json();
        const stocks = stokit.quoteResponse.result

        ctx.replyWithMarkdown(`
        ${stocks.map(stock => `*${stock.symbol}*: ${stock.regularMarketPrice}$
Muutos: ${stock.regularMarketChangePercent.toFixed(2)}% \n\n`).join('')}
`);
}

const userStockMessage = (stock) => {
    const marketPrice = stock.regularMarketPrice ? stock.regularMarketPrice : 'Hinta ei tiedossa';
    const currency = stock.currency ? stock.currency : '';
    const change = stock.regularMarketChangePercent ? `Muutos: ${stock.regularMarketChangePercent.toFixed(2)}%` : 'Muutos ei tiedossa';
    return`
*${stock.symbol}*: ${marketPrice} ${currency} \n${change}\n`;
}

const getUserStocks = async (ctx, userName) => {
    try {
        let rawdata = fs.readFileSync('database.json');
        const { database } = JSON.parse(rawdata);
        console.log('database', database);
        const { tickers } = database.find(user => user.name === userName);
        if (tickers.length > 0) {
            console.log('tickers', tickers);
        const response = await fetch(`https://query1.finance.yahoo.com/v7/finance/quote?lang=en-US&region=US&corsDomain=finance.yahoo.com&symbols=${tickers}`)
        const stokit = await response.json();
        const stocks = stokit.quoteResponse.result
            console.log('stokit', stokit);

        ctx.replyWithMarkdown(`
    Tässä osakkeesi ${userName}:
    ${stocks.map(stock => userStockMessage(stock)).join('')}
    `);
        } else {
            ctx.reply(`Et ole lisännyt osakkeita listallesi.
            Voit lisätä osakkeita komennolla /stocks add tickername
            ja poistaa osakkeita komennolla /stocks remove tickername`);
        }
    } catch (e) {
        console.log('VIRHE', e);
    }
};

const getSingleStockWithSuggestion = async (ctx, stockName) => {
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?lang=en-US&region=US&corsDomain=finance.yahoo.com&symbols=${stockName}`;
    const response = await fetch(url);
    const stokit = await response.json();
    if (stokit.quoteResponse.result.length === 0) {
        getStockSuggestions(ctx, stockName);
    } else {
        return stokit.quoteResponse.result;
    }
};

const addStockToDatabase = (ctx, userName, symbol) => {
    fs.readFile('database.json', function (err, data) {
        const { database } = JSON.parse(data)
        const { tickers } = database.find(user => user.name === userName);
        tickers.push(symbol);
        fs.writeFile("database.json", JSON.stringify({database}), function (err) {
            if (err) throw err;
            ctx.reply('Osake lisätty.');
        });
    })
};

const removeStockFromDatabase = (ctx, userName, symbol) => {
    fs.readFile('database.json', function (err, data) {
        const { database } = JSON.parse(data)
        const { tickers } = database.find(user => user.name === userName);
        const lowerCaseTickers = tickers.map(v => v.toLowerCase());
        const index = lowerCaseTickers.indexOf(symbol.toLowerCase());
        if (index > -1) {
            tickers.splice(index, 1);
        }
        fs.writeFile("database.json", JSON.stringify({ database }), function (err) {
            if (err) throw err;
            ctx.reply('Osake poistettu.');
        });
    })
};

const removeStock = (ctx, userName, symbol) => {
    let rawdata = fs.readFileSync('database.json');
    const { database } = JSON.parse(rawdata);
    const { tickers } = database.find(user => user.name === userName);
    const lowerCaseTickers = tickers.map(v => v.toLowerCase());
    if (lowerCaseTickers.includes(symbol.toLowerCase())) {
        removeStockFromDatabase(ctx, userName, symbol);
    } else {
        ctx.reply('Listallasi ei ole kyseistä osaketta.')
    }
};

const addStockToUser = async (ctx, userName, stockname) => {
    let rawdata = fs.readFileSync('database.json');
    const { database } = JSON.parse(rawdata);
    const { tickers } = database.find(user => user.name === userName);
    if (tickers.includes(stockname)) {
        ctx.reply('Osake on jo listallasi.');
    } else {
        const stockFound = await getSingleStockWithSuggestion(ctx, stockname);
        if (stockFound && stockFound.length) {
            addStockToDatabase(ctx, userName, stockFound[0].symbol)
        }
    }
};

module.exports = {
    getStock,
    getAllStocks,
    getUserStocks,
    addStockToUser,
    removeStock,
    getGraafi,
};