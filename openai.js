const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateImage = async (ctx, query) => {
  console.log('starting openai image generation');
  try {
    const response = await openai.images.generate({
      prompt: query,
      n: 1,
      size: '1024x1024',
    });
    const imageUrl = response.data[0].url;
    ctx.replyWithPhoto({ url: imageUrl });
  } catch (error) {
    if (error.response) {
      ctx.reply('Quota täynnä tai jotain meni pieleen');
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      ctx.reply('Quota täynnä tai jotain meni pieleen');
      console.log(error.message);
    }
  }
};

const shortChat = async (ctx, query) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [{ role: 'user', content: query }],
      model: 'gpt-3.5-turbo',
    });
    console.log(response.choices[0].message.content);
    ctx.reply(response.choices[0].message.content);
  } catch (error) {
    if (error.response) {
      ctx.reply('Quota täynnä tai jotain meni pieleen');
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      ctx.reply('Quota täynnä tai jotain meni pieleen');
      console.log(error.message);
    }
  }
};

module.exports = { generateImage, shortChat };
