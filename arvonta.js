const getRandomItem = (ctx, items) => {
  const random = items[Math.floor(Math.random() * items.length)];
  ctx.reply(random);
};

module.exports = getRandomItem;
