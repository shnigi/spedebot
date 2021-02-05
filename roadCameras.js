const fetch = require('node-fetch');

const getRoadCameras = async (ctx, command) => {
    const response = await fetch('https://tie.digitraffic.fi/api/v3/metadata/camera-stations');
    const data = await response.json();
    
    const cameraIds = [];
    const cameraPictures = [];
    data.features.forEach((camera) => {
        if(
            camera && 
            camera.properties && 
            camera.properties.presets[0] && 
            camera.properties.presets[0].presentationName && 
            camera.properties.presets[0].presentationName.toLowerCase().includes(command.toLowerCase())
        ) {
            cameraIds.push(camera.properties.presets[0].cameraId)
        }
    })

    const randomTwoCameras = cameraIds.sort(() => Math.random() - Math.random()).slice(0, 2)

    Promise.all(randomTwoCameras.map(async cameraId => {
        const response = await fetch(`https://tie.digitraffic.fi/api/v2/data/camera-history/history?id=${cameraId}`);
        const data = await response.json();
        const imageUrl = data[0] && data[0].cameraHistory[0].presetHistory[0].imageUrl
        cameraPictures.push(imageUrl)
    }))
    .then(() => {
        if(cameraPictures.length) {
            cameraPictures.forEach((pictureUrl => ctx.replyWithPhoto({ url: pictureUrl })));
        } else {
            ctx.reply('Ei löytynyt kuvia, kokeile urpo uudestaan.');
        }
    })
    .catch((error) => console.log("Error: ", error))
    .finally(() => clearArrays())
}

const clearArrays = () => {
    cameraIds = []
    cameraPictures = []
}

module.exports = getRoadCameras;