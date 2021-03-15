const fetch = require('node-fetch');

const searchMovie = async (ctx, movieName) => {
    const search = encodeURI(movieName.trim());
    const url = `http://www.omdbapi.com/?t=${search}&apikey=${process.env.OMDB_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data && data.Response === 'True') {
        ctx.reply(`${data.Title} - ${data.Year}
Genre: ${data.Genre}
Juoni: ${data.Plot}
Arvio: ${data.imdbRating}`);
    } else {
        ctx.reply('No eipä löytynyt!');
    }
};

module.exports = searchMovie;
