const fetch = require("node-fetch");

const getStockSuggestions = async (ctx, stockName) => {
    const url = `https://finance.yahoo.com/_finance_doubledown/api/resource/searchassist;searchTerm=${stockName}`;
    const response = await fetch(url);
    const symbolSuggests = await response.json();
    const { items } = symbolSuggests;
    if ( items && items.length === 0 ) {
        ctx.reply('En osaa edes ehdottaa mitään. Kokeile urpo uudestaan');
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

const getAllStocks = async (ctx) => {
        const response = await fetch(`https://query1.finance.yahoo.com/v7/finance/quote?lang=en-US&region=US&corsDomain=finance.yahoo.com&symbols=tlss,mmedf,AVGR`)
        const stokit = await response.json();
        const stocks = stokit.quoteResponse.result

        ctx.replyWithMarkdown(`
        ${stocks.map(stock => `*${stock.symbol}*: ${stock.regularMarketPrice}$
Muutos: ${stock.regularMarketChangePercent.toFixed(2)}% \n\n`).join('')}
`);
}

module.exports = {
    getStock,
    getAllStocks
};