var test 	= require('tape'),
db 			= require('../server/db.js'),
_           = require('underscore')

test('addEntryToDay', function(t) {
	db.addEntryToDay('1.1.1', {'test':'test'} ,function(err, len) {
        t.equal(null, err, 'entry should be dded to 1.1.1')
    })
    
	db.addEntryToDay('1.1.1', {'test':'test'} ,function(err, len) {        
	    db.addEntryToDay('1.1.1', {'test':'test'} ,function(err, len) {
	        db.addEntryToDay('1.1.1', {'test':'test'} ,function(err, len) {
	            db.addEntryToDay('1.1.1', {'test':'test'} ,function(err, len) {
	                db.addEntryToDay('1.1.1', {'test':'test'} ,function(err, len) {
                        t.notEqual(null, err, 'err should not be null. day is full')
                    })
                })
            })
        })
    })

    t.end()
})


test('getEntry', function(t) {
    var obj = [{'name':'entry1'},{'name':'entry2'}]
    db.addEntryToDay('1.1.1',obj , function(err, msg) {
        db.getEntriesFromDay('1.1.1', function(err, msg) {
            t.notEqual(msg, [], "entry should be found")
            t.equal(err, null, 'no error expected')
        })

    db.getEntriesFromDay('111', function(err, msg) {
        t.equal(msg, {}, 'no entry. msg should be empty set')
  })
})
    
	t.end()
})
