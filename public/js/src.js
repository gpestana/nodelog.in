var socket = io()


//outbound

function requestServer(action, id) {
   //actions: 'get day', 'get next day', 'get last day' 
    socket.emit(action, id)
    //attach loading bar
}


//inbound
socket.on('server res', function(data) {
    //how to detect error ?
    if (typeof data == string) console.log('error')    
    //if no error, 1) remove loading bar, 2) replace data
})


//utils
function getTodayID() {
    var date = new Date()
    return id = date.getYear()+'.'+parseInt(date.getMonth()+1)+'.'+date.getDate()
}
