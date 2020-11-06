
const request = require('request');

const fetchMyIP = function(callback) {
  request('http://ip-api.com/json/174.94.0.87', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).query;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request('http://ip-api.com/json/174.94.0.87', (error, response, body) => {
    
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body.query}`), null);
      return;
    }

    const { lat, lon } = JSON.parse(body);
    callback(null, {lat, lon});


  });

};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=43.6532&lon=-79.3832`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
  const passes = JSON.parse(body).response;
  callback(null, passes);

  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPass) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPass);
      });
    });
  });
};
module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };