const fetch = require('node-fetch');

const searchHaystack = (needle, haystack) => {
    const query = needle.toLowerCase();
    return haystack.filter((item) => item.name.toLowerCase().indexOf(query) >= 0);
};

const getMemes = async (ctx, memename) => {
    const url = 'https://api.imgflip.com/get_memes';
    const response = await fetch(url);
    const { data } = await response.json();
    const results = searchHaystack(memename, data.memes);
    if (results.length > 0) {
        ctx.reply(`Kävisikö joku seuraavista memeistä?
        ${results.map((meme) => `${meme.name} - ID: ${meme.id}`)}
        `);
    } else {
        ctx.reply('No hemmetti, eipä löytynyt meemejä!');
    }
};

const generateMeme = async (ctx, id, text1, text2) => {
    const topText = encodeURI(text1.trim());
    const bottomText = encodeURI(text2.trim());
    const generate = await fetch(`https://api.imgflip.com/caption_image?template_id=${id}&username=shnigi2&password=tittiriitattaraa123&text0=${topText}&text1=${bottomText}`, {
        method: 'post',
    });
    const response = await generate.json();
    if (response.success) {
        ctx.replyWithPhoto({ url: response.data.url });
    } else {
        ctx.reply('No perhana, jotain meni pieleen.');
    }
};

module.exports = {
    getMemes,
    generateMeme,
};
