const request = require('request-promise-native');

// const request = require('request');

const fetchMyIP = function (callback) {
  // use request to fetch IP address from JSON API
  return request('https://api.ipify.org?format=json');
}

const fetchCoordsByIP = (ip, callback) => {

  ip = JSON.parse(ip).ip;
  return request(`https://ipvigilante.com/${ip}`);

}

const fetchISSFlyOverTimes = function(coords, callback) {

  coords = JSON.parse(coords);
  latitude = coords.data.latitude;
  longitude = coords.data.longitude;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${Number(latitude)}&lon=${Number(longitude)}`);
  
};

const nextISSTimesForMyLocation = (callback) => {

  fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    
    const passTimes = JSON.parse(data).response;

    for(const pass of passTimes){
      const dateTime = new Date(0);
      dateTime.setUTCSeconds(pass.risetime);
      console.log(`Next pass at ${dateTime} for ${pass.duration} seconds`);
    }
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });

}

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };