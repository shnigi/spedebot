const fetch = require('node-fetch');

const wikipedia = async (ctx, queryParam) => {
    const search = encodeURI(queryParam.trim());
    const query = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${search}`);
    const results = await query.json();
    const searchResults = results.query.search;
    const resultsWithLinks = searchResults.map((result) => ({
        title: result.title,
        url: `https://en.wikipedia.org/w/index.php?curid=${result.pageid}`,
    }));
    console.log('resultsWithLinks', resultsWithLinks);
    ctx.replyWithMarkdown(`Löysin seuraavia wikipediasta:
${resultsWithLinks.map((item) => `${item.title}
${item.url}
`).join('')}`);
};

module.exports = wikipedia;
