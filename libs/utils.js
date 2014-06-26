function dbPrint(err, msg) {
	if(err) console.log(err)
	else console.log('redis res: '+ msg)

	if(msg > 1) {
		console.log('ATTENTION: duplicated entries')
	}
}


//no callbacks needed. simple returns are ok
function generateDateID(date) {
	console.log(date)
	return (date.getDate()+'.'+date.getMonth()+'.'+date.getYear())
}

function getNextDayID(current_day, clbk) {
	console.log(current_day)

	var next_day = new Date()
	
	var nextDate = next_day.setDate(current_day.getDate()+1)

	clbk(generateDateID(nextDate))
}

function getLastDayID(current_day, clbk) {
	var last_day = new Date()
	clb(generateDateID(last_day.setDate(current_day.getDate()-1)))
}


exports.getLastDayID = getLastDayID
exports.getNextDayID = getNextDayID
exports.dbPrint = dbPrint
//exports.generatedateID = generatedateID

