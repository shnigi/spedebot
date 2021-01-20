const sali = (ctx) => {
    switch (new Date().getDay()) {
    case 0:
        // day = "Sunday";
        ctx.reply('Sunnuntai, darrapäivä.');
        break;
    case 1:
        // day = "Monday";
        ctx.reply(`
Maanantai. Ylävartalo:
Penkki raskas 3-4 sarjaa, 6-12 toistoa
Soutu tangolla 3 sarjaa, 6-12 toistoa
Vinopenkki raskas 3 sarjaa, 6-12 toistoa
Olkaprässi 3 sarjaa, 6-12 toistoa
Karhunhalaus 3 sarjaa, 6-12 toistoa
Ylätalja 3 sarjaa, 6-12 toistoa
Olkapäät 2 sarjaa, 6-12 toistoa
Hauikset 2 sarjaa, 6-12 toistoa
Ojentajat 2 sarjaa, 6-12 toistoa
Vatsat 2 sarjaa, 6-12 toistoa
        `);
        break;
    case 2:
        // day = "Tuesday";
        ctx.reply(`
Tiistai. Alavartalo:
Kyykky raskas 3-4 sarjaa, 6-12 toistoa
Jalkaprässi raskas 3-4 sarjaa, 6-12 toistoa
Mave raskas 3-4 sarjaa, 6-12 toistoa
Takareisi 3-4 sarjaa, 6-12 toistoa
Pohkeet 2-3 sarjaa, 6-12 toistoa
Kumarrukset tangolla 2-3 sarjaa, 6-12 toistoa
Vatsat 3 sarjaa, 6-12 toistoa
        `);
        break;
    case 3:
        // day = "Wednesday";
        ctx.reply('Keskiviikko on lepopäivä.');
        break;
    case 4:
        // day = "Thursday";
        ctx.reply(`
Torstai. Ylävartalo:
Penkki kevyt 4 sarjaa, 8-12 toistoa
Soutu kaapelilla 3-4 sarjaa, 8-12 toistoa
Vinopenkki kevyt 3-4 sarjaa, 8-12 toistoa
Olkaprässi käsipainot 3 sarjaa, 8-12 toistoa
Karhunhalaus 3 sarjaa, 8-12 toistoa
Ylätalja 3 sarjaa, 8-12 toistoa
Olkapäät kaapeli 3 sarjaa, 8-12 toistoa
Hauikset 3 sarjaa, 8-12 toistoa
Ojentajat 3 sarjaa, 8-12 toistoa
Vatsat 3 sarjaa, 8-12 toistoa
        `);
        break;
    case 5:
        // day = "Friday";
        ctx.reply(`
Perjantai. Alavartalo:
Kyykky kevyt 3 sarjaa, 8-12 toistoa
Jalkaprässi kevyt 3 sarjaa, 8-12 toistoa
Mave kevyt 3 sarjaa, 8-12 toistoa
Takareisi 3 sarjaa, 8-12 toistoa
Pohkeet 3 sarjaa, 8-12 toistoa
Kumarrukset tangolla 3 sarjaa, 8-12 toistoa
Vatsat 3 sarjaa, 8-12 toistoa
        `);
        break;
    case 6:
        // day = "Saturday";
        console.log('PIM! Avaa kalja!');
    }
};

module.exports = sali;