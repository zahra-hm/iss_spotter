

const { fetchCoordsByIP } = require('./iss');

fetchCoordsByIP('174.94.0.87', (error, coords) => {
  // if (error) {
  //   console.log("It didn't work!" , error);
  //   return;
  // }

  console.log('It worked! Returned Coords:' , coords);
});