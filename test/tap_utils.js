var test 	= require('tape'),
utils		= require('../libs/utils.js')

var id = '114.1.12'


//getDateFromID not available outside
/*
test('getDateFromID', function(t) {
    utils.getDateFromID(id, function(date) {
        console.log(date)
        t.equal(date.getYear(), 114, 'id\'s year is 2014')
        t.equal(date.getMonth(), 0, 'id\'s month is 0 (jan)')
        t.equal(date.getDate(), 12, 'id\'s day is 12')
    })
    t.end()
})
*/

test('getNextDayID', function(t) {
    utils.getNextDayID(id, function(nextID) {
        t.equal(nextID, '114.1.13')
    })    
    t.end()
})

test('getLastDayID', function(t) {
    utils.getLastDayID(id, function(lastID) {
        t.equal(lastID, '114.1.11')
    })
    t.end()
})
