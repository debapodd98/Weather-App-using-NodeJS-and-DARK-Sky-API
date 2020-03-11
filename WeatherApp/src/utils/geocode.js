const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZGViYXBvZGQxOSIsImEiOiJjanhxNW1uMWwwamJ3M2hsM2JwdGZhbDIyIn0.2Dp6L2ChhZlAFj1LL64dqg&limit=1'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to Location Services!', undefined)
        } else if (body.features.length == 0) {
            callback('Try Another Serach!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
