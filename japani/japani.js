const { Markup } = require('telegraf');
const _ = require('lodash');
const { japanVideos } = require('./videos');

const japanVideosInChunk = _.chunk(japanVideos, 3);

const japani = async (ctx, bot) => {
  await ctx.telegram.sendMessage(
    ctx.message.chat.id,
    'Valitse video',
    Markup.inlineKeyboard(
      japanVideosInChunk.map((chunk) =>
        chunk.map((video) => Markup.button.callback(video.name, video.name)),
      ),
    ),
  );

  japanVideos.forEach((video) => {
    bot.action(video.name, async (ctx) => {
      try {
        await ctx.deleteMessage();
      } catch (e) {
        console.error('Could not delete message:', e);
      }

      await ctx.replyWithVideo({ source: `./japani/videos/${video.url}` });
    });
  });
};

module.exports = { japani };
