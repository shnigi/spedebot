const wordsToListenFor = ['pystytkö', '/kick tommi', 'pizza'];

const wordListener = (ctx) => {
    for (let i in wordsToListenFor) {
        if (ctx.message.text.toLowerCase().includes(wordsToListenFor[i])) {
            replyToWord(ctx, wordsToListenFor[i])
        }
    }
}

const replyToWord = (ctx, word) => {
  switch(word) {
    case 'pystytkö':
        ctx.replyWithAudio({ source: './media/PystynVaanenPistä.mp3' })
        break;
    case '/kick tommi':
        ctx.reply('Tommi lensi ulos mutta pingahti takaisin sisälle.')
        break;
    case 'pizza':
        ctx.reply('Pizzaperjantai?')
        break;
    default:
        break;
    }
}

module.exports = wordListener;