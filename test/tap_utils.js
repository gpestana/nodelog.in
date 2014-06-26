var test 	= require('tape'),
utils		= require('../libs/utils.js')

//note: date is variable. not forget to update comaprison variables!!


test('getTomorrowID', function(t) {
	var today = new Date()
	console.log(today)
	utils.getNextDayID(today, function(id) {
		t.equal(id, '114.17.17' , 'tomorrow ID gen OK')
	})


	t.end()
})

test('getYesterdayID', function(t) {
	t.end()
})


