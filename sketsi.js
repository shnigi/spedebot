const fetch = require("node-fetch");

const sketsi = async (ctx) => {
    const response = await fetch('https://meme-api.herokuapp.com/gimme')
    const sketsi = await response.json();

    ctx.replyWithPhoto({ url: sketsi.url });
}

module.exports = sketsi;