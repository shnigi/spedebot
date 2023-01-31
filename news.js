const fetch = require('node-fetch');

const news = async (ctx) => {
  const url =
    'https://www.is.fi/api/pe/v2/listitems/frontpage/5b4a52535359760f0009045d5e55585b150153075210005e50545e0957530e5a?group=pe&platform=web';
  const response = await fetch(url);
  const json = await response.json();
  const data = json.result.filter((item, index) => index < 8 && item);
  const headlines = data.map((item) => {
    if (item && item.listItem && item.listItem.title) {
      return { title: item.listItem.title, url: item.listItem.href };
    }
    return {};
  });
  ctx.reply(
    `${headlines
      .map(
        (item) => `${item.title}
${item.url}
`,
      )
      .join('')}`,
  );
};

module.exports = { news };
