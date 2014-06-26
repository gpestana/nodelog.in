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

db.addEntry('114.01.12', day1, utils.dbPrint)
db.addEntry('114.01.13', day2, utils.dbPrint)
db.addEntry('114.01.14', day3, utils.dbPrint)

}


exports.populateDB = populateDB