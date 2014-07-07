var socket = io()

var nanobar = new Nanobar({bg: '#8CC94B',id: 'nanobar'})

var LAUNCHING_DAY_ID = '114.7.5'

//trigger
requestServer('get day', getDayID(null))


/*
 * client logic (front end)
 *
 */

function renderPanel(data) {
    console.log('day is not empty \n')
    var dataObj = JSON.parse(data[0])
    var url, title, feat, contrib   
    var id = data[1]
 
    for(var i = 0; i<=4; i++) {
        url = dataObj[i].url
        title = dataObj[i].title
        feat = dataObj[i].feat
        contrib = dataObj[i].contrib
        contrib_pic = dataObj[i].contrib_pic
        
        $('.post:nth-child('+parseInt(i+1)+')').replaceWith(function() {
            return populatePost(url, title, feat, contrib, contrib_pic)
        })

    }
    updateNav(id, true) 
}

function renderEmptyPanel(msg) {
    console.log('day is empty')
    $('.post').replaceWith('<div class="post empty"></div>')
    $('.post:nth-child(3)').replaceWith(function() {
        return '<div class="post empty"><center> Day has no content yet. Suggest some.</center> </div>'
    }) 
    updateNav(msg[0], false)
}

function populatePost(url, title, feat, contrib, contrib_pic) {
    return  '<div class="post"><div class="row"><div class="col-md-2 col-sm-2 col-xs-2  contrib"><img class="contrib-pic img-circle" src="'+contrib_pic+'"></img><small><a href="http://www.twitter.com/'+contrib+'">@'+contrib+'</a></small></div><div class="col-md-10 col-sm-10 col-xs-10 entry"><h4>'+title+'</h4><small>'+url+'</small><p class="pull-right"><a href="'+url+'" <span class="glyphicon glyphicon-new-window"></span></a></p></div></div></div>'

}



function updateNav(id, showNext) {
    var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sept", "Oct", "Nov", "Dec" ]
    var date = getDateFromID(id)
    var current = monthNames[date.getMonth()]+' '+date.getDate()
    var next = ''
    var last = ''
    var dateBuff = date 
 

    if(showNext) {
        var dateBuff = getDateFromID(id)
        var nextDay = new Date(dateBuff.setDate(dateBuff.getDate()+1))
        next = monthNames[nextDay.getMonth()]+' '+nextDay.getDate()
    } 
    if(id != LAUNCHING_DAY_ID) {
        var  dateBuff = getDateFromID(id)
        var lastDay = new Date(dateBuff.setDate(dateBuff.getDate()-1))
        last = monthNames[lastDay.getMonth()]+' '+lastDay.getDate() 
    } 

    //append
    var currentDayNode = $('.currentDay')
    var lastDayNode = $('.lastDay')
    var nextDayNode = $('.nextDay')

    currentDayNode.text(current)
    
    lastDayNode.text(last)
    lastDayNode.unbind('click') 
    lastDayNode.bind('click', function() {
        requestServer('get day', getDayID(lastDay))
    })

    nextDayNode.text(next)
    nextDayNode.unbind()
    nextDayNode.bind('click', function() {
        requestServer('get day', getDayID(nextDay))
    })

    nanobar.go(100)
}



/*
 * Server communication
 *
 */

//outbound
function requestServer(action, id) {
    nanobar.go(10)
    console.log('request to server...')
   //actions: 'get day', 'get next day', 'get last day' 
    socket.emit(action, id)
    //attach loading bar
}


//inbound
socket.on('server res', function(data) {
    nanobar.go(40)
    //what to do in case of error from server ?
    if (typeof data == 'string') console.log('server res error')
    //if no error, 1) remove loading bar, 2) replace data
    else {
       if(data.length == 1) renderEmptyPanel(data)
       else renderPanel(data)
    }  
})




/*
 *  Utils
 *
 */

function getDayID(date) {
    if(date == null) {
        date = new Date()
    }
    return date.getYear()+'.'+parseInt(date.getMonth()+1)+'.'+date.getDate()
}

function getDateFromID(id) {
    id  = id.split('.')
    var year = parseInt(id[0])+1900 //Date returns 114 instead of 2014
    var month = parseInt(id[1])-1
    var day = parseInt(id[2])
    return new Date(year, month, day)
}

/*
 * Nanobar
 *
 */


