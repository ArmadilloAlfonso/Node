const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000

//Define paths for express config
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Wheather App',
        name: 'Alfonso'
    })
})
app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Alfonso'
    })
})
app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        text: "This is a helpfull text",
        name: 'Alfonso'
    })
})

app.get('/wheather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if(error){
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     forecast: 'Is snowing',
    //     location: 'Madrid',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
       return res.send({
            error: "You must provide a search term"
        })
    }
    res.send({
        products:""
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        name: 'Alfonso',
        errorMessage: "404 Page not found"
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port +'.')
});