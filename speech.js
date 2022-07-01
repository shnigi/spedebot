const http = require('http'); // or 'https' for https:// URLs
const fs = require('fs');
const path = require('path');

const speech = (ctx, text) => {
    const textToQuery = encodeURI(text);
    const filePath = path.join(__dirname, './downloads/speech.mp3');
    const file = fs.createWriteStream(filePath);
    const baseUrl = 'http://translate.google.com.vn/translate_tts?ie=UTF-8&q=';
    http.get(`${baseUrl}${textToQuery}&tl=fi&client=tw-ob`, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            file.close();
            ctx.replyWithAudio({ source: filePath });
            try {
                fs.unlinkSync(filePath);
            } catch (err) {
                console.error('removing file errored:', err);
            }
        });
    });
};

module.exports = speech;
