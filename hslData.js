const { request, gql } = require('graphql-request')
const moment = require('moment');

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
`

const locations = [
    {
        name: 'anders',
        lat: 60.220804,
        lon: 25.118656,
    },
    {
      name: 'niki',
      lat: 60.275318,
      lon: 25.036040,
    },
    {
      name: 'roivas',
      lat: 60.263935,
      lon: 25.040980,
    },
    {
      name: 'halmela',
      lat: 60.256019,
      lon: 25.000067,
    },
    {
      name: 'juuso',
      lat: 60.315798,
      lon: 25.006047,
    },
    {
      name: 'mikko',
      lat: 60.282842,
      lon: 25.098162,
    },
    {
      name: 'mustonen',
      lat: 60.384803,
      lon: 25.090005,
    },
    {
      name: 'samu',
      lat: 60.318012,
      lon: 24.848237,
    },
    {
      name: 'aleksi',
      lat: 60.317997,
      lon: 24.831530,
    },
    {
      name: 'vikman',
      lat: 60.419122,
      lon: 25.096422,
    },
    {
      name: 'kemi',
      lat: 60.189950,
      lon: 24.591059,
    }
];

const getTime = (serviceDay, scheduledDeparture) => {
  const timeStamp = serviceDay + scheduledDeparture;
  return moment.unix(timeStamp).format("HH:mm:ss");
}


const nextDepartures = (data) => `
Seuraavat lähdöt:
${data.map(departure => `
${departure.node.place.stop.name}
    ${departure.node.place.stoptimes.map(stoptimes => `
    ${stoptimes.trip.route.longName}
    ${stoptimes.trip.route.shortName}
    ${getTime(stoptimes.serviceDay, stoptimes.scheduledDeparture)}
    `).join('')}
`).join('')}
`;

const getHslData = async (ctx, name) => {
    const { lat, lon } = locations.find(location => location.name === name);
    const data = await request(url, query(lat, lon));
    const filteredData = data.nearest.edges.filter(node => node.node.place.stoptimes.length > 0);
    const botText = nextDepartures(filteredData);
    ctx.reply(botText);
};

module.exports = getHslData;