/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

const fetchMyIP = function (callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    callback(error, JSON.parse(body).ip);

  })
}

const fetchCoordsByIP = (ip, callback) => {

  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `[ERROR]: Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(msg, null);
      return;
    }
    
    const bodyParse = JSON.parse(body);

    data = {latitude: bodyParse.data.latitude, longitude: bodyParse.data.longitude}

    callback(error, data);

  })

}

const fetchISSFlyOverTimes = function(coords, callback) {
  
  request(`http://api.open-notify.org/iss-pass.json?lat=${Number(coords.latitude)}&lon=${Number(coords.longitude)}`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `[ERROR]: Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(msg, null);
      return;
    }

    callback(error, JSON.parse(body).response);

  })
  
};

const nextISSTimesForMyLocation = (callback) => {

  fetchMyIP((error, ip) => {

    fetchCoordsByIP(ip, (error, coords) => {

      fetchISSFlyOverTimes(coords, (error, passTimes) =>{
        
        for(const pass of passTimes){
          const dateTime = new Date(0)
          dateTime.setUTCSeconds(pass.risetime)
          callback(error, `Next pass at ${dateTime} for ${pass.duration} seconds`);
        }

      })

    })

  })

}

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };