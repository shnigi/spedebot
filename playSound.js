const playSound = (ctx, command) => {
  switch (command) {
    case '1':
      ctx.replyWithAudio({ source: './media/AjaSaatana.mp3' });
      break;
    case '2':
      ctx.replyWithAudio({ source: './media/EnLahde.mp3' });
      break;
    case '3':
      ctx.replyWithAudio({ source: './media/Enminkaansuuruisella.mp3' });
      break;
    case '4':
      ctx.replyWithAudio({ source: './media/EnOle.mp3' });
      break;
    case '5':
      ctx.replyWithAudio({ source: './media/haistapaska.mp3' });
      break;
    case '6':
      ctx.replyWithAudio({ source: './media/mursupaska.mp3' });
      break;
    case '7':
      ctx.replyWithAudio({
        source: './media/PuhutVahanMuttaAsiaaMinaSoitanTaksin.mp3',
      });
      break;
    case '8':
      ctx.replyWithAudio({ source: './media/PystynVaanenPista.mp3' });
      break;
    case '9':
      ctx.replyWithAudio({ source: './media/Turpakiinni.mp3' });
      break;
    default:
      ctx.reply('Komento väärin, kokeile urpo uudestaan.');
      break;
  }
};

module.exports = playSound;
