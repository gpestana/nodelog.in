var test 	= require('tape'),
db 			= require('../server/db.js'),
_           = require('underscore')

//tearDown
setTimeout(function() {
    db.deleteDay('1.1.1', function() {
        db.killClient()
    })
}, 1000)


test('addDay', function(t) {
	db.addDay('1.1.1', {'test':'test'} ,function(err, len) {
        t.equal(null, err, 'entry should be dded to 1.1.1')    
	    db.addDay('1.1.1', {'test':'test'} ,function(err, len) {        
            t.notEqual(null, err, 'entry is full, error should be triggered')
        })
    })
    t.end()
})

test('getEntry', function(t) {
    var obj = [{'name':'entry1'},{'name':'entry2'}]
    db.addDay('1.1.1', obj, function(err, msg) {
        db.getDay('1.1.1', function(err, msg) {
            t.notEqual(_.isEmpty(msg), true, 'returned object should not be empty')
            t.equal(err, null, 'no error expected')
        })
    })
    
    db.getDay('111', function(err, msg) {
        t.equal(_.isEmpty(msg), true, 'returned obj should be empty')
    })   
	
    t.end()
    
})

test('deleteDay', function(t) {
    db.addDay('1.1.2', 'justTestin', function(err, msg) {
        db.deleteDay('1.1.2', function(err, msg) {
            t.equal(1, msg, 'entry should be delted (because it exists)')
        }) 
    })
    db.deleteDay('notExistent', function(err, msg) {
        t.equal(0, msg, 'entry should not be deleted because it does not exist')
    })

    t.end()
})
