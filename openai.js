const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (ctx, query) => {
    console.log('starting openai image generation');
    const imagineText = encodeURI(query.trim());
    try {
        const response = await openai.createImage({
            prompt: imagineText,
            n: 1,
            size: "1024x1024",
          });
          image_url = response.data.data[0].url;
          console.log('image_url', image_url);
          ctx.replyWithPhoto({ url: image_url });
      } catch (error) {
        if (error.response) {
          ctx.reply('Quota täynnä tai jotain meni pieleen')
          console.log(error.response.status);
          console.log(error.response.data);
        } else {
          ctx.reply('Quota täynnä tai jotain meni pieleen')
          console.log(error.message);
        }
      }
};

const shortChat = async (ctx, query) => {
    const text = encodeURI(query.trim());
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Human: ${text}`,
            temperature: 0.9,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.6,
            stop: [" Human:", " AI:"],
          });
          console.log('chat', response);
          ctx.reply(response.data.choices[0].text);
      } catch (error) {
        if (error.response) {
          ctx.reply('Quota täynnä tai jotain meni pieleen')
          console.log(error.response.status);
          console.log(error.response.data);
        } else {
          ctx.reply('Quota täynnä tai jotain meni pieleen')
          console.log(error.message);
        }
      }
};

module.exports = { generateImage, shortChat };
