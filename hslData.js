const { request, gql } = require('graphql-request');
const moment = require('moment');
const locations = require('./friendLocations');

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
              serviceDay
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
`;
const getTime = (serviceDay, scheduledDeparture) => {
  const timeStamp = serviceDay + scheduledDeparture;
  return moment.unix(timeStamp).format('HH:mm:ss');
};

const nextDepartures = (data) => `
Seuraavat lähdöt:
${data.map((departure) => `
${departure.node.place.stop.name}
    ${departure.node.place.stoptimes.map((stoptimes) => `
    ${stoptimes.trip.route.longName}
    ${stoptimes.trip.route.shortName}
    ${getTime(stoptimes.serviceDay, stoptimes.scheduledDeparture)}
    `).join('')}
`).join('')}
`;

const getHslData = async (ctx, name) => {
  const { lat, lon } = locations.find((location) => location.name === name);
  const data = await request(url, query(lat, lon));
  const filteredData = data.nearest.edges.filter((node) => node.node.place.stoptimes.length > 0);
  const botText = nextDepartures(filteredData);
  ctx.reply(botText);
};

module.exports = getHslData;
