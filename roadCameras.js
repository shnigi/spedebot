const fetch = require('node-fetch');

const getRoadCameras = async (ctx, command) => {
  const cameraStationsResponse = await fetch('https://tie.digitraffic.fi/api/v3/metadata/camera-stations');
  const cameraStationsData = await cameraStationsResponse.json();
  const cameras = [];

  cameraStationsData.features.forEach((camera) => {
    if (
      camera
            && camera.properties
            && camera.properties.presets[0]
            && camera.properties.presets[0].presentationName
            && camera.properties.presets[0].presentationName.toLowerCase().includes(command.toLowerCase())
    ) {
      cameras.push({ name: camera.properties.presets[0].presentationName, id: camera.properties.presets[0].cameraId, imageUrl: '' });
    }
  });
  if (!cameras.length) {
    return ctx.reply('Paikkaa ei löytynyt, kokeile urpo uudestaan.');
  }
  const randomCamera = cameras.sort(() => Math.random() - Math.random()).slice(0, 1);
  const cameraDataResponse = await fetch(`https://tie.digitraffic.fi/api/v2/data/camera-history/history?id=${randomCamera[0].id}`);
  const cameraData = await cameraDataResponse.json();
  randomCamera[0].imageUrl = cameraData[0].cameraHistory[0].presetHistory[0].imageUrl;

  if (randomCamera[0].imageUrl && randomCamera[0].name) {
    const cameraName = randomCamera[0].name;
    const cameraImageUrl = randomCamera[0].imageUrl;
    ctx.replyWithPhoto({ url: cameraImageUrl }, { caption: `Kameran nimi: ${cameraName}` });
  } else {
    ctx.reply('Ei löytynyt kuvia, kokeile urpo uudestaan.');
  }
};

module.exports = getRoadCameras;
