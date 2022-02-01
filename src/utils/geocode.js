const request = require('request')

const geocode = (address, callback) => {
  const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoiY2FtaWxsZWJyZWlsbG90IiwiYSI6ImNrdmNlM3hrZzJoeWgycW9rcHQ3ejN4eDYifQ.oizuMPwDU5tMRWvIlDCDWg&limit=1"

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services!', undefined)
    } else if (!body.features || body.features.length === 0) {
      callback('Unable to find location. Try another search.', undefined)
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode
