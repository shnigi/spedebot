const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const openAi = async (ctx, query) => {
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
          console.log(error.response.status);
          console.log(error.response.data);
        } else {
          console.log(error.message);
        }
      }
};

module.exports = openAi;
