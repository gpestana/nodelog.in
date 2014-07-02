var express	= require('express'),
app		 	= express(),
http 		= require('http').Server(app),
hbs 		= require('hbs'),
_           = require('underscore'),
io          = require('socket.io').listen(http),
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
	res.sendfile('public/index.html')
})

app.get('/about', function(req, res) {
    //res.render('about')
})


//io
io.on('connection', function(socket) {
    console.log('user connected')
    
    socket.on('get day', function(id) {
        console.log('client asked for day '+id)
        db.getEntriesFromDay(id, function(err, data){
            if(err) socket.emit('server res', '[err]: '+ err)
            else socket.emit('server res', data)
        })
    })
    
    socket.on('get next day', function(id) {
        console.log('client asked for next day of '+id)
        utils.getNextDayID(id, function(nextDayID) {
            db.getEntriesFromDay(nextDayID, function(err, data) {
                if (err) socket.emit('server res', '[err]: '+err)
                else socket.emit('server res', data)    
            })
        })
    })
    
    socket.on('get last day', function(id) {
        console.log('client asked for last day of '+id)
        utils.getLastDayID(id, function(lastDayID) {
            db.getEntriesFromDay(lastDayID, function(err, data) {
                if (err) socket.emit('server res', '[err]: '+err)
                else socket.emit('server res', data)
            })
        })
    })

})




//launch server
http.listen(3000, function() {
	console.log('listening on port 3000')
})
