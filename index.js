var express	= require('express'),
app		 	= express(),
http 		= require('http').Server(app),
hbs 		= require('hbs'),
_           = require('underscore'),
io          = require('socket.io').listen(http),
db			= require('./server/db.js'),
utils		= require('./libs/utils.js'),
twitter     = require('./libs/twitter.js')
auth        = require('./server/auth.js').auth

//dev
var populate = require('./libs/populate_dev.js')

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
    res.sendfile('public/about.html')
})

app.get('/contribute', function(req, res) {
    res.sendfile('public/contribute.html')
})

app.get('/feedback', function(req, res) {
    res.sendfile('public/feedback.html')
})

app.get('/admin', auth, function(req, res) {
    res.sendfile('public/admin.html')
})



//io
io.on('connection', function(socket) {
    console.log('user connected')
    
    socket.on('get day', function(id) {
        console.log('client asked for day '+id)
        db.getDay(id, function(err, data){
            if(err) socket.emit('server res', '[err]: '+ err)
            else socket.emit('server res', data)
        })
    })
    
    socket.on('get next day', function(id) {
        console.log('client asked for next day of '+id)
        utils.getNextDayID(id, function(nextDayID) {
            db.getDay(nextDayID, function(err, data) {
                if (err) socket.emit('server res', '[err]: '+err)
                else socket.emit('server res', data)    
            })
        })
    })
    
    socket.on('get last day', function(id) {
        console.log('client asked for last day of '+id)
        utils.getLastDayID(id, function(lastDayID) {
            db.getDay(lastDayID, function(err, data) {
                if (err) socket.emit('server res', '[err]: '+err)
                else socket.emit('server res', data)
            })
        })
    })



    //admin
    socket.on('admin add day', function(data) {
        var id = data[0]
        var entries = data[1]
        db.addDay(id, entries, function(err, msg) {
            socket.emit('admin server res', err, msg)
        })
    })
    
    socket.on('admin remove day', function(id) {
        db.deleteDay(id, function(err, msg) {
            socket.emit('admin server res', err, msg)
        })
    })    

    socket.on('admin list day', function(id) {
        db.getDay(id, function(err, msg) {
            socket.emit('admin server res', err, msg)
        })
    })    

    socket.on('get contrib pic', function(handler) {
    var size = 'bigger'    
    twitter.getContribPicture(handler, size, function(err, msg) {
            socket.emit('admin server res', err, [msg])    
        })    
    })
})




//launch server
http.listen(3000, function() {
	console.log('listening on port 3000')
})
