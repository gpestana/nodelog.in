function generateDateID(date, clbk) {
    if (!date instanceof Date) {
        clbk('error: arg not a Date')
    } else {
        var id = date.getYear()+'.'+parseInt(date.getMonth()+1)+'.'+date.getDate()
        clbk(id)
    }
}

function getDateFromID(id, clbk) {
    id  = id.split('.')
    var year = parseInt(id[0])+1900 //Date returns 114 instead of 2014
    var month = parseInt(id[1])-1 //Date starts conting months on 0
    var day = parseInt(id[2])
    clbk(new Date(year, month, day))
}

function getNextDayID(currentDayID, clbk) {
	getDateFromID(currentDayID, function(date) {
        date.setDate(date.getDate()+1)
        generateDateID(date, clbk)
    })
}

function getLastDayID(currentDayID, clbk) {
    getDateFromID(currentDayID, function(date) {
        date.setDate(date.getDate()-1)
        generateDateID(date, clbk)
    })
}

//exports.getDateFromID = getDateFromID
//exports.generateDateID = generateDateID
exports.getLastDayID = getLastDayID
exports.getNextDayID = getNextDayID

