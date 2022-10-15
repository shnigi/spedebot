const fetch = require('node-fetch');

// const downloadFile = (async (url) => {
//     const res = await fetch(url);
//     const fileStream = fs.createWriteStream('./filename.jpg');
//     await new Promise((resolve, reject) => {
//         res.body.pipe(fileStream);
//         res.body.on('error', reject);
//         fileStream.on('finish', resolve);
//     });
// });

const imageRecognitionResults = (ctx, { result }) => {
    const firstFive = result.tags.filter((_, index) => index < 5);
    ctx.reply(`Arvelen että kuvassa olisi seuraavaa: ${firstFive.map(item => `
${item.confidence.toFixed(1)}% ${item.tag.en}`).join('')}
`);
};

const imageRecognition = async (ctx, imageUrl) => {
    const apiKey = process.env.IMAGGA_API;
    const apiSecret = process.env.IMAGGA_SECRET;
    
    const url = `https://api.imagga.com/v2/tags?image_url=${imageUrl}`;
    
    try {
        const response = await fetch(url, {  
            method: 'GET',
            headers: {
                apiKey,
                apiSecret,
                Authorization: process.env.IMAGGA_AUTH,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }});
        const json = await response.json();
        imageRecognitionResults(ctx, json);
    } catch (error) {
        console.log(error.response);
    }
};

module.exports = imageRecognition;