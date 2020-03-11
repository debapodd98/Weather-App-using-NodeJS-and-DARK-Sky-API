const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Debanjan Podder'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Debanjan Podder'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Debanjan Podder'
    })
})

app.get('/wweather', (req, res) => {
    if (!req.query.addres) {
        return res.send({
            error: 'you must provide address term'
        })
    }
    geocode(req.query.addres, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, foreCastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: foreCastData,
                location,
                addres: req.query.addres
            })
        })

    })
    /* res.send({
         forecast: 'It is snowing',
         location: 'Philadelphia',
         address: req.query.address
     })*/

})
// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'you must provide search term'
//         })
//     }
//     res.send({
//         products: []
//     })
// })
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Debanjan Podder',
        errorMessage: 'Help article not found.'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Debanjan Podder',
        errorMessage: 'Page not found.'
    })
})
app.listen(port, () => {
    console.log('Server is on port ' + port)
})