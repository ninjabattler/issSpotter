// // index.js
// const { fetchMyIP } = require('./iss');
// const { fetchCoordsByIP } = require('./iss');
// const { fetchISSFlyOverTimes } = require('./iss');

// const ipFectch = () =>{
//   fetchMyIP((error, ip) => {
//     if (error) {
//       console.log("It didn't work!" , error);
//       return;
//     }

//     return ip;
//   });
// }
// const coordFetch = ()=>{
//   fetchCoordsByIP(ipFectch.toString(), (error, data)=>{
//     return data;

//   })
// }

// fetchISSFlyOverTimes({latitude: '48.44960', longitude: '-123.41930'}, (error, data)=>{

//   console.log(error);
//   console.log(data);

// })

const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});