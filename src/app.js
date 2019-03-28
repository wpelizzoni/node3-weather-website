/* Get a basic server up and running.  First, install express 
<npm init -y> 
<npm i express@4.16.4> */
const path = require('path')  // this comes from a core module 
const express = require('express')
/* Here we show an examples of partials which allow us to reuse code */
const hbs = require('hbs')
/* Use <CTL> C to stop nodemon. To install "request" in the npm project enter <npm i request@2.88.0>.
Now restart nodemon as follows <nodemon src/app.js -e js,hbs> */
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


/* Define paths for Express config.  dirname and filename come from the above require function.
Look at "expressjs.com/en/4x/api.html" to see built-in settings, etc.   */
// console.log(__dirname)
// console.log(path.join(__dirname), '../public')  
const app = express() 
/* Use the port number provided by Heroku or 3000 if we're running the application locally in VS Code. */
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
/* Express looks for html files in the views folder by default. We can rename this folder to anything 
(e.g. temnplates) but need to set up a viewsPath to make it work. */
const viewsPath = path.join(__dirname, '../templates/views')
/* Partials contain reusable code such as a header that is included in all hbs html files.  We access
partials with the > symbol in the hbs html files. */
const partialsPath = path.join(__dirname, '../templates/partials')

/* NPM Handlebars supports dynamic pages.  There is a handlebars plugin for Express.
Google "npmjs.com/package/hbs".  Install it in the console by entering 
<npm i hbs@4.0.1>.  Then tell Express which templating engine we installed with the
app.set command. Then we must create a "views" directory inside of the web-server folder.*/
app.set('view engine', 'hbs')

/* Here we set up the views directory using the directory name we chose.  Of course, this
is unnecessary of we just call the directory views.  */
app.set('views', viewsPath)
/* To run using partials enter <nodemon src/app.js -e js,hbs>.  To actually use a partial
we enter {{>...}} in the html file */
hbs.registerPartials(partialsPath)

/* Here we customize the server to read the html file from the public folder when the user 
enters localhost:3000 from the browser. Note: this command will tell express to look in the 
public directory for the file when the user types localhost:3000 without a subdirectory.  
This means the first (default) app.get call below will never run and can be deleted.  The other 
app.get calls are uneffected because they don't rely on default commands. This call is for 
static web page content that must be stored in the public directory.  We deleted these HTML 
files and moved them to the views (templates) directory to demonstrate dynamic web pages 
using handlebars.  Look for a match in the public folder first.  */
app.use(express.static(publicDirectoryPath))

/* Now configure what the server should do when someone tries to get a resource from the url.
Set up a function.  These handlers are removed when we later implemented separate html files 
in the public directory. */
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')  // this HTML what this server serves to the browser 
// })   
// /* From the browser, type localhost:3000/help to see this JSON array. */
// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Andrew',
//     }, {
//         name: 'Sarah'
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

/* Now we set up the server to use the hbs engine associated with the index file containing
dynamic HTML that is in the views folder. Express looks for these files in the views directory.
Test by entering 
<cd C:\Users\wpelizzoni\Desktop\node-course\web-server>
<nodemon src/app.js> on the console. 
Then return to the browser and visit localhost:3000 */

/* Here we set the home page <localhost:3000> with no extension */
app.get('/', (req, res) => {
    res.render ('index', {
    title: 'Weather',
    name: 'Andrew Mead'
    })
})

/* other examples using handlebars which allows dynamic content.   Match localhost:3000/about */
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

/* Handle the query sting <localhost:3000/weather?address=philadelphia>.   */ 
app.get('/weather', (req, res) => {
        if (!req.query.address) {
            return res.send({   // send a json response to the browser 
                error: 'You must provide an address!'
            })
        }
        /* Set up an http endpoint that sends back valid information.  Send a callback function to 
        geocode and destructure the returned forecast data.  The server can crash on some input
        such as ?=! or no data unless we set up a default object to destructure "= {}" */
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }
            /* Send a callback function for forecast to call when it has the forecastData */
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }

                res.send({ // send json data to the browser 
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })
})

/* Set up a product query in the Express route handler.  Query strings begin with a "?" on the end 
of the URL.  For example, <localhost:3000/products?key=value> or 
<localhost:3000/products?search=games> or <localhost:3000/products?search=games&rating=5>*/
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({   // use return to make sure send doesn't execute twice
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

 /* Set up a catch all for help 404s */
app.get('/help/*', (req, res) => {
    res.render ('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

/* Match everything else here */
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

/* To start the server up, we use this call (here with a common development port).  Include
a callback function that runs when the server is started. Next we go to the Visual Studio Code
console and enter <node src/app.js> to start the server. We can shut down the web server with <CTL> C.
From the browser, we can access th3e server with <localhost:3000>.  To add more code to the server and
rerun it, enter <CTL> C and then <nodemon src/app.js> on the console which will automatically restart
the server whenever we make a change.  */
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

/* Verify changes to the server HTML files by going to the browser, clicking the three horizontal bars,
click <Web developer> and click <Web console>.  This is how we see changes to the web application
as opposed to changes to local javascript that is visible in the Visual Studio Code console. */ 

/* Go to <links.mead.io/pic3> to get weather icon, right click and save as in the img folder.  This icon 
is supposed to be used in the tab but is coming up blank.  */

