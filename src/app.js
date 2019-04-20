const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

const port = process.env.PORT || 3000

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Angel Santiago'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Angel Santiago'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address;

    if (!address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) return res.send({ error });
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) return res.send({ error });
    
            res.send({ 
                forecastData, 
                location, 
                address 
            });
        });
    });
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is the help page.',
        name: 'Angel Santiago'
    })
})

app.get('/help/*', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Help article not found',
        name: 'Angel Santiago'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404 Page',
        errorMessage: 'Page not found',
        name: 'Angel Santiago'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})