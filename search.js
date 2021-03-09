const fetch = require('node-fetch');

const searchDuckDuck = async (ctx, search) => {
    const url = `https://api.duckduckgo.com/?q=${search}&format=json`;
    const response = await fetch(url);
    const data = await response.json();
    if (data && data.RelatedTopics.length > 0) {
        ctx.reply(`${data.RelatedTopics[0].Text} - ${data.RelatedTopics[0].FirstURL}`);
    } else {
        ctx.reply('Ei kyllä löytynyt niin yhtään mitään!');
    }
};

const searchWolfram = async (ctx, searchWord) => {
    const search = encodeURI(searchWord.trim());
    const url = `http://api.wolframalpha.com/v1/result?appid=${process.env.WOLFRAM_ALPHA_TOKEN}&i=${search}&units=metric`;
    const response = await fetch(url);
    const data = await response.text();
    if (data) {
        if (data === 'No short answer available' || data === 'Wolfram|Alpha did not understand your input') {
            searchDuckDuck(ctx, search);
        } else {
            ctx.reply(data);
        }
    }
};

module.exports = searchWolfram;
