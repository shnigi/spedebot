const fs = require('fs');

const chances = ['CLICK 😌🔫', 'CLICK 😌🔫', 'CLICK 😌🔫', 'CLICK 😌🔫', 'CLICK 😌🔫', 'BANG 🤯🔫'];
const DBname = 'rulettiDB.json';

const rulettiNextlevel = (ctx, userName) => {
    try {
        const rawdata = fs.readFileSync(DBname);
        const { database } = JSON.parse(rawdata);
        const userData = database.find((user) => user.name === userName);
        if (userData) {
            console.log('userData', userData);
            const shoot = chances[Math.floor(Math.random() * chances.length)];
            if (shoot.includes('CLICK')) {
                userData.shots += 1;
                userData.lived += 1;
                userData.survivePercentage = ((userData.lived / userData.shots) * 100).toFixed(2);
                console.log('wat', database.find((user) => user.name === userName));
                console.log('database', database);
                ctx.reply(shoot);
                ctx.reply(`Ampunut: ${userData.shots} Kuollut: ${userData.died} Selviytymisprosentti: ${userData.survivePercentage}`);
            } else {
                userData.shots += 1;
                userData.died += 1;
                userData.survivePercentage = ((userData.lived / userData.shots) * 100).toFixed(2);
                ctx.reply(shoot);
                ctx.reply(`Ampunut: ${userData.shots} Kuollut: ${userData.died} Selviytymisprosentti: ${userData.survivePercentage}`);
            }
            console.log('database', database);
            // fs.writeFile(DBname, JSON.stringify({ database }), (err) => {
            //     if (err) throw err;
            //     ctx.reply('ja statsit talletettu');
            // });
        }
    } catch (e) {
        console.log('VIRHE', e);
    }
};

module.exports = rulettiNextlevel;
