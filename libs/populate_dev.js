var db = require('../server/db.js') 

function populateDB() {

var day1 = [
		{'feat':'false' ,'url':'www.google1.com','colab':'pic1'},
		{'feat':'false' ,'url':'www.google2.com','colab':'pic2'},
		{'feat':'false' ,'url':'www.google3.com','colab':'pic3'},
		{'feat':'false' ,'url':'www.google4.com','colab':'pic4'},
		{'feat':'false' ,'url':'www.google5.com','colab':'pic5'}
	]
var day2 = [
		{'feat':'false' ,'url':'www.google1.com','colab':'pic1'},
		{'feat':'false' ,'url':'www.google2.com','colab':'pic2'},
		{'feat':'false' ,'url':'www.google3.com','colab':'pic3'},
		{'feat':'true' ,'url':'www.google4.com','colab':'pic4'},
		{'feat':'false' ,'url':'www.google5.com','colab':'pic5'}
	]
var day3 = [
		{'feat':'false' ,'url':'www.google1.com','colab':'pic1'},
		{'feat':'false' ,'url':'www.google2.com','colab':'pic2'},
		{'feat':'false' ,'url':'www.google3.com','colab':'pic3'},
		{'feat':'false' ,'url':'www.google4.com','colab':'pic4'},
		{'feat':'false' ,'url':'www.google5.com','colab':'pic5'}
	]

db.addEntryToDay('114.1.12', day1, function() {})
db.addEntryToDay('114.1.13', day2, function() {})
db.addEntryToDay('114.1.14', day3, function() {})

}


exports.populateDB = populateDB
