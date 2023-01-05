const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (ctx, query) => {
  console.log('starting openai image generation');
  try {
    const response = await openai.createImage({
      prompt: query,
      n: 1,
      size: '1024x1024',
    });
    const imageUrl = response.data.data[0].url;
    console.log('imageUrl', imageUrl);
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
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Human: ${query}`,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: [' Human:'],
    });
    console.log(response.data);
    ctx.reply(response.data.choices[0].text);
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
