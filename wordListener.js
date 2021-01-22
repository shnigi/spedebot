const wordsToListen = ['mursu', '/kick tommi', 'pizza'];

const replyToWord = (ctx, word) => {
    switch(word) {
      case 'mursu':
          ctx.replyWithAudio({ source: './media/mursupaska.mp3' })
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

const wordListener = (ctx) => wordsToListen
    .filter(word => ctx.message.text
    .toLowerCase()
    .includes(word) && replyToWord(ctx, word));

module.exports = wordListener;