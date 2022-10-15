const fetch = require('node-fetch');

const apiKey = process.env.IMAGGA_API;
const apiSecret = process.env.IMAGGA_SECRET;
const Authorization = process.env.IMAGGA_AUTH;

const headers = {
    apiKey,
    apiSecret,
    Authorization,
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

// const downloadFile = (async (url) => {
//     const res = await fetch(url);
//     const fileStream = fs.createWriteStream('./filename.jpg');
//     await new Promise((resolve, reject) => {
//         res.body.pipe(fileStream);
//         res.body.on('error', reject);
//         fileStream.on('finish', resolve);
//     });
// });

const getImaggaUsage = async () => {
    const url = 'https://api.imagga.com/v2/usage';

    try {
        const response = await fetch(url, {  
            method: 'GET',
            headers
        });
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error.response);
    }
}

const imageRecognitionResults = (ctx, { result }, usage) => {
    const firstFive = result.tags.filter((_, index) => index < 8);
    ctx.reply(`Kuva-analyysejä käytetty tässä kuussa: ${usage.result.monthly_processed} / ${usage.result.monthly_limit}
Arvelen että kuvassa olisi seuraavaa: ${firstFive.map(item => `
${item.confidence.toFixed(1)}% ${item.tag.en}`).join('')}
`);
};

const imageRecognition = async (ctx, imageUrl) => {
    const url = `https://api.imagga.com/v2/tags?image_url=${imageUrl}`;
    
    try {
        const response = await fetch(url, {  
            method: 'GET',
            headers
        });
        const json = await response.json();
        const usage = await getImaggaUsage();
        imageRecognitionResults(ctx, json, usage);
    } catch (error) {
        console.log(error.response);
    }
};

module.exports = imageRecognition;