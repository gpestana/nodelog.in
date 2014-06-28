function dbPrint(err, msg) {
	if(err) console.log(err)
	else console.log('redis res: '+ msg)

	if(msg > 1) {
		console.log('ATTENTION: duplicated entries')
	}
}


function generateDateID(date, clbk) {
	var id = date.getYear()+'.'+parseInt(date.getMonth()+1)+'.'+date.getDate()
    clbk(id)
}

function getNextDayID(currentDay, clbk) {
	var nextDay = new Date()
    nextDay.setDate(currentDay.getDate()+1)
	
    generateDateID(nextDay, clbk)
}

function getLastDayID(currentDay, clbk) {
	var lastDay = new Date()
    lastDay.setDate(currentDay.getDate()-1)
    
    generateDateID(lastDay, clbk)
}

exports.getLastDayID = getLastDayID
exports.getNextDayID = getNextDayID
exports.dbPrint = dbPrint
exports.generateDateID = generateDateID

