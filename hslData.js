const { request, gql } = require('graphql-request')

const url = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';

const query = (lat, lon) => gql`
{
	nearest(lat: ${lat}, lon: ${lon}, maxDistance: 500, filterByPlaceTypes: DEPARTURE_ROW) {
    edges {
      node {
        place {
          ...on DepartureRow {
            stop {
              lat
              lon
              name
            }
            stoptimes {
              scheduledDeparture
              realtimeDeparture
              trip {
                route {
                  shortName
                  longName
                }
              }
              headsign
            }
          }
        }
      	distance
      }
    }
  }
}
`

const locations = [
    {
        name: 'Anders',
        lat: 60.220804,
        lon: 25.118656,
    }
];

const nextDepartures = (data) => `
Seuraavat lähdöt:
${data.map(departure => `
${departure.node.place.stop.name}
    ${departure.node.place.stoptimes.map(stoptimes => `
    ${stoptimes.headsign}
    ${stoptimes.scheduledDeparture}
    `).join('')}
`).join('')}
`;

const getHslData = async (ctx, name) => {
    name = 'Anders'
    const { lat, lon } = locations.find(location => location.name === name);
    const data = await request(url, query(lat, lon));
    const botText = nextDepartures(data.nearest.edges);
    console.log('botText', botText);
};
getHslData();

module.exports = getHslData;