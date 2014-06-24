var express	= require('express'),
app		 	= express(),
http 		= require('http').Server(app),
hbs 		= require('hbs')


//handlebars config
app.set('view engine', 'hbs')
app.set('views', __dirname + '/server/views')
hbs.registerPartials(__dirname + '/server/views/partials')


app.use('/static', express.static(__dirname + '/public'))


app.get('/', function(req, res) {
	res.locals = {'msg': 'msg'}
	res.render('index')
})


app.get('/:date', function(req, res) {
	console.log('init')
	
	/*
	res.locals = {
		'roomID': roomID,
		'videoID': data.currentVideoID
	}
	res.render('room')
	*/
})



//launch server
http.listen(3000, function() {
	console.log('listening on port 3000')
})
