const fetch = require('node-fetch');

const googleSearch = async (ctx, searchWord) => {
    const search = encodeURI(searchWord.trim());
    const url = `https://google-search3.p.rapidapi.com/api/v1/search/q=${search}&num=5`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'google-search3.p.rapidapi.com',
            'x-rapidapi-key': '96b0d2ba5emsh0761b04b049fdacp17ae29jsne81efc14cb14',
        },
    });
    const data = await response.json();
    if (data.results.length > 1) {
        const { title, link, description } = data.results[0];
        const text1 = description !== '' ? description : title;
        ctx.reply(`${text1} - ${link}`);
    } else {
        ctx.reply('Edes google ei osaa nyt auttaa.');
    }
};

module.exports = googleSearch;
