const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateImage = async (ctx, query) => {
  console.log('starting openai image generation');
  try {
    const response = await openai.images.generate({
      prompt: query,
      model: 'dall-e-3',
    });
    const imageUrl = response.data[0].url;
    ctx.replyWithPhoto({ url: imageUrl });
  } catch (error) {
    if (error.response) {
      ctx.reply(`Quota täynnä tai jotain meni pieleen: ${error.response.data}`);
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      ctx.reply(`Quota täynnä tai jotain meni pieleen: ${error.message}`);
      console.log(error.message);
    }
  }
};

const shortChat = async (ctx, query) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [{ role: 'user', content: query }],
      model: 'gpt-4-turbo-preview',
    });
    console.log(response.choices[0].message.content);
    ctx.reply(response.choices[0].message.content);
  } catch (error) {
    if (error.response) {
      ctx.reply(`Quota täynnä tai jotain meni pieleen: ${error.response.data}`);
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      ctx.reply(`Quota täynnä tai jotain meni pieleen: ${error.message}`);
      console.log(error.message);
    }
  }
};

const aiVision = async (ctx, query, image) => {
  console.log('starting openai vision image generation', query);
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: query },
            {
              type: 'image_url',
              image_url: { url: image, detail: 'low' },
            },
          ],
        },
      ],
      max_tokens: 150,
    });
    console.log(response.choices);
    ctx.reply(response.choices[0].message.content);
  } catch (error) {
    if (error.response) {
      ctx.reply(`Quota täynnä tai jotain meni pieleen: ${error.response.data}`);
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      ctx.reply(`Quota täynnä tai jotain meni pieleen: ${error.message}`);
      console.log(error.message);
    }
  }
};

module.exports = { generateImage, shortChat, aiVision };
