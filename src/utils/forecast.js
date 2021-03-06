const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/6578058fe5a4c0568f4174d237774847/' + latitude + ',' + longitude

    /* A response object is being passed so we destructure it in line to access the body variable. 
    Note that this destructured object is a callback parameter */
    request({ url, json: true }, (error, { body }) => {
        if (error) {
                callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
                callback('Unable to find location', undefined)
        } else {
                /* Output the first day's data on the console with the code "console.log(body.daily.data[0])". 
                This will show us data we may want to work with */
                 
                callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. The high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + '. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast