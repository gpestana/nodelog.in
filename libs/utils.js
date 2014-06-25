function getTimeID() {
	date = new Date()
	return (date.getDate()+'.'+date.getMonth()+'.'+date.getYear())
}

exports.getTimeID = getTimeID