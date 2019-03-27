const request = require('request')

const geocode = (address, callback) => {
    // Create a dynamic URL by removing the hard coded city name and replacing it with ' + address '
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYWFyb24yMjIiLCJhIjoiY2p0NjJha2l4MGNtMTN5bGpmejd6a2w3ciJ9.SgAsPn_LDLF6SFOZj9tWxQ&limit=1'
    
    request ({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!')
        } else if (body.features.length === 0) {
            callback('Unable to find location.   Try another search.', undefined)
        } else {
        /* Return to browser and check api.mapbox.com/geocodeing/v5/mapbox.places/Philadelphis.jason?access_token=pk.... 
           for fields to return in the callback.  */
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
    
}

module.exports = geocode