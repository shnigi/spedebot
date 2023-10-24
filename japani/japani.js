const { Markup } = require('telegraf');
const { japanVideos } = require('./videos');
const _ = require('lodash');

const japanVideosInChunk = _.chunk(japanVideos, 3);

const japani = async (ctx, bot) => {
  ctx.telegram.sendMessage(
    ctx.message.chat.id,
    'Valitse video',
    Markup.inlineKeyboard(
      japanVideosInChunk.map((chunk) =>
        chunk.map((video) => Markup.button.callback(video.name, video.name)),
      ),
    ),
  );

  japanVideos.map((video) =>
    bot.action(video.name, (ctx) => {
      ctx.replyWithVideo({ source: `./japani/videos/${video.url}` });
      ctx.editMessageReplyMarkup('');
      ctx.editMessageText('Laitetaan video pyörimään');
    }),
  );
};

module.exports = { japani };
