var redis	= require('redis'),
client		= redis.createClient()

client.on('error', function(err) {
	console.log('db error: '+err)
})

function addEntry(date, obj, clbk) {
	client.llen(date, function(err, len) {
		if (len >= 5) {
			clbk("DB: day "+date+" is full", null)
		} else {
			client.rpush(date, JSON.stringify(obj), function(err, msg) {
				clbk(err, msg)
			})
		}
	})
}

function getEntry(date, clbk) {
	client.lrange(date, 0, -1, function(err, msg) {
		clbk(err, msg)
	})
}

exports.addEntry = addEntry
exports.getEntry = getEntry