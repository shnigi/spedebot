const wordsToListen = ['mursu', 'pizza'];

const replyToWord = (ctx, word) => {
    switch(word) {
        case 'mursu':
            ctx.replyWithAudio({ source: './media/mursupaska.mp3' })
            break;
        case 'pizza':
            ctx.reply('Pizzaperjantai?')
            break;
        default:
            break;
    }
}

const wordListener = (ctx) => wordsToListen
    .filter(word => ctx.message.text
    .toLowerCase()
    .split(' ')
    .includes(word)
    && replyToWord(ctx, word));

module.exports = wordListener;
