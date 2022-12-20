const fetch = require('node-fetch');

const sketsi = async (ctx) => {
    const response = await fetch('https://meme-api.com/gimme');
    const json = await response.json();

    ctx.replyWithPhoto({ url: json.url });
};

module.exports = sketsi;
