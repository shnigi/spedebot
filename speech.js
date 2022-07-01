const http = require('http'); // or 'https' for https:// URLs
const fs = require('fs');

const speech = (ctx, text) => {
    const textToQuery = encodeURI(text);
    const file = fs.createWriteStream('./downloads/speech.mp3');
    const baseUrl = 'http://translate.google.com.vn/translate_tts?ie=UTF-8&q=';
    http.get(`${baseUrl}${textToQuery}&tl=fi&client=tw-ob`, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            file.close();
            ctx.replyWithAudio({ source: './downloads/speech.mp3' });
            try {
                fs.unlinkSync('./downloads/speech.mp3');
            } catch (err) {
                console.error(err);
            }
        });
    });
};

module.exports = speech;
