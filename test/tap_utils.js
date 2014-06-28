var test 	= require('tape'),
utils		= require('../libs/utils.js')

//note: date is variable. not forget to update comaprison variables!!
var tomID = '114.6.28'
var ydayID = '114.6.26'
var today = new Date()

test('getTomorrowID', function(t) {
	utils.getNextDayID(today, function(id) {
		t.equal(id, tomID, 'tomorrow ID gen OK')
	})
	t.end()
})

test('getYesterdayID', function(t) {
	utils.getLastDayID(today, function(id) {
        t.equal(id, ydayID, 'yesterday ID gen OK')
    })
    t.end()
})


