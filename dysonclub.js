const fetch = require('node-fetch');

const getDysonClubCode = async (ctx) => {
    const resp = await fetch('https://authenticator666.azurewebsites.net/api/signupkey_generator', {
        method: 'POST',
        headers: {
          'Content-type': '	text/plain; charset=utf-8',
          api_key: process.env.DYSON,
        },
      });
    const result = await resp.text()
    if (result) {
        ctx.reply(result);
    } else {
        ctx.reply('Jotain meni vituiksi');
    }
}

module.exports  = { getDysonClubCode };