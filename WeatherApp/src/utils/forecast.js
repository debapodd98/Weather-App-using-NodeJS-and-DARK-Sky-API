const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/45cf2cd51db7bcef32fcbb3de6b08bc7/' + latitude + ',' + longitude
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to Location Services!', undefined)
        } else if (body.error) {
            callback('Try Another Serach!', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + 'degrees out .')
        }
    })
}

module.exports = forecast


