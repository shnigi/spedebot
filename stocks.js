const fetch = require("node-fetch");

const getStock = async (ctx, stockName) => {
    const response = await fetch(`https://query1.finance.yahoo.com/v7/finance/quote?lang=en-US&region=US&corsDomain=finance.yahoo.com&symbols=${stockName}`)
    const stokit = await response.json();
    if (stokit.quoteResponse.result.length === 0) {
        ctx.reply('Osaketta ei löydy, kokeile urpo uudestaan.');
    } else {
        const [currentValue] = stokit.quoteResponse.result
        ctx.reply(`
${stockName}: ${currentValue.regularMarketPrice}$
Muutos: ${currentValue.regularMarketChangePercent.toFixed(2)}%
        `);
    }
};

const getAllStocks = async (ctx) => {
        const response = await fetch(`https://query1.finance.yahoo.com/v7/finance/quote?lang=en-US&region=US&corsDomain=finance.yahoo.com&symbols=tlss,mmedf,AVGR`)
        const stokit = await response.json();
        const stocks = stokit.quoteResponse.result

        ctx.reply(`
        ${stocks.map(stock => `${stock.symbol}: ${stock.regularMarketPrice}$
Muutos: ${stock.regularMarketChangePercent.toFixed(2)}% \n`).join('')}
        `);
}

module.exports = {
    getStock,
    getAllStocks
};