var express	= require('express'),
app		 	= express(),
http 		= require('http').Server(app),
hbs 		= require('hbs'),
_           = require('underscore'),
db			= require('./server/db.js'),
utils		= require('./libs/utils.js')

//dev
var populate = require('./libs/populate_dev.js')
//populate.populateDB()

//handlebars config
app.set('view engine', 'hbs')
app.set('views', __dirname + '/server/views')
hbs.registerPartials(__dirname + '/server/views/partials')


//static
app.use('/static', express.static(__dirname + '/public'))

app.get('/', function(req, res) {
	res.render('index')
})

app.get('/about', function(req, res) {
    //res.render('about')
})


//REST interface
app.get('/:dateID', function(req, res) {
	var dateID = req.params.dateID
    db.getEntriesFromDay(dateID, function(err, data) {
        res.json(data)
    })
})

app.get('/next/:date', function(req, res) {
    var currentDayID = req.params.date
    utils.getNextDayID(currentDayID, function(nextDayID) {
        db.getEntriesFromDay(nextDayID, function(err, data) {
            res.json(data)
        })
    })
})

app.get('/last/:date', function(req, res) {
    var currentDayID = req.params.date
    utils.getLastDayID(currentDayID, function(lastDayID) {
        db.getEntriesFromDay(lastDayID, function(err, data) {
            res.json(data)
        })
    })
})


//newsletter sign in

//event click on link




//launch server
http.listen(3000, function() {
	console.log('listening on port 3000')
})
