const fs = require('fs');

const chances = ['CLICK 😌🔫', 'CLICK 😌🔫', 'CLICK 😌🔫', 'BANG 🤯🔫', 'CLICK 😌🔫', 'CLICK 😌🔫'];
const DBname = 'rulettiDB.json';

const writeToFile = (database) => {
    fs.writeFile(DBname, JSON.stringify({ database }), (err) => {
        if (err) throw err;
    });
};

const rulettiNextlevel = (ctx, userName) => {
    try {
        const rawdata = fs.readFileSync(DBname);
        const { database } = JSON.parse(rawdata);
        const userData = database.find((user) => user.name === userName);
        if (userData) {
            const shoot = chances[Math.floor(Math.random() * chances.length)];
            if (shoot.includes('CLICK')) {
                userData.shots += 1;
                userData.lived += 1;
                userData.survivePercentage = ((userData.lived / userData.shots) * 100).toFixed(0);
                writeToFile(database);
                ctx.reply(`${shoot} Ampunut: ${userData.shots} Kuollut: ${userData.died} Selviytymisprosentti: ${userData.survivePercentage}%`);
            } else {
                userData.shots += 1;
                userData.died += 1;
                userData.survivePercentage = ((userData.lived / userData.shots) * 100).toFixed(0);
                writeToFile(database);
                ctx.reply(`${shoot} Ampunut: ${userData.shots} Kuollut: ${userData.died} Selviytymisprosentti: ${userData.survivePercentage}%`);
            }
        } else {
            ctx.reply('Sinua ei ole lisätty pelin tietokantaan.');
        }
    } catch (e) {
        console.log('VIRHE', e);
    }
};

const rulettiResults = (ctx) => {
    const rawdata = fs.readFileSync(DBname);
    const { database } = JSON.parse(rawdata);
    ctx.reply(`${database.map((player) => `${player.name} - Ampunut: ${player.shots} Kuollut: ${player.died} Selviytymisprosentti: ${player.survivePercentage}% \n`).join('')}`);
};

module.exports = { rulettiNextlevel, rulettiResults };
