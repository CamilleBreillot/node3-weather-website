const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// define path for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
   res.render('index', {
     title: 'Weather',
     name: 'Camille Breillot'
   })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Camille Breillot'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'Need some help?',
    title: 'Help',
    name: 'Camille Breillot'
  })
})

app.get('/weather', (req, res) => {

  if (!req.query.address) {
    return res.send({
      error: 'you must provide address'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        address: req.query.address,
        location,
        forecast: forecastData
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 help',
    name: 'Camille Breillot',
    errorMessage: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Camille Breillot',
    errorMessage: 'Page not found'
  })
})

app.listen(port, () => {

  console.log('Server is up and running on port ' + port)
})
