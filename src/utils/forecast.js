const request = require('request')

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=7c45554a063761e40fb58d3d3a0de46e&query=${long},${lat}`
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to reach network", undefined)
    } else if (body.error) {
      callback("Unable to find location", undefined)
    } else {
      const temp = body.current.temperature
      const tempRessenti = body.current.feelslike
      const weatherDescrip = body.current.weather_descriptions[0]
      const humidity = body.current.humidity
      callback(undefined, `${weatherDescrip}. It is currently ${temp} degrees out. It feels like ${tempRessenti} degrees out. The humidity is ${humidity}%.`)
    }
  })
}

module.exports = forecast
