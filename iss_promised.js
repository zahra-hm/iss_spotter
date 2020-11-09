const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('http://ip-api.com/json/174.94.0.87');
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`http://ip-api.com/json/174.94.0.87`);
};

const fetchISSFlyOverTimes = function(body) {
  const { lat, lon } = JSON.parse(body);
  const url = `http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}`;
  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };


// module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };