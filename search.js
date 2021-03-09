const fetch = require('node-fetch');

const searchWolfram = async (ctx, searchWord) => {
    const search = encodeURI(searchWord.trim());
    const url = `http://api.wolframalpha.com/v1/result?appid=${process.env.WOLFRAM_ALPHA_TOKEN}&i=${search}&units=metric`;
    const response = await fetch(url);
    const data = await response.text();
    if (data) {
        ctx.reply(data);
    }
};

module.exports = searchWolfram;
