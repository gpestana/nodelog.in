//info about current's day ID
document.getElementById("id").placeholder = "today's ID: "+getTodayID()

//buttons triggers
function addDay() {
    var formData = []
    var id = document.getElementById("id").value

    for(var i = 1; i<=5; i++) {
        var entryN = {}
        entryN.title = document.getElementById("title_"+i).value 
        entryN.url = document.getElementById("url_"+i).value
        entryN.feat = document.getElementById("feat_"+i).value
        entryN.contrib = document.getElementById("contrib_"+i).value
        entryN.count = 0
        formData.push(entryN)
    }
    
    if(!validateInput(formData) || id == '') {
        panelMsg('add day: input invalid', null)
    } else socket.emit('admin add day', [id, formData])
}

function removeDay() {
    var id = document.getElementById("remove_id").value
    console.log("remove "+id) 
 
    socket.emit('admin remove day',id)
}

function listDay() {
    var id = document.getElementById("list_id").value
    console.log("list "+id)
   
    socket.emit('admin list day', id)
}


socket.on('admin server res', function(err, msg) {
    panelMsg(err, msg)
})


function validateInput(input) {
    console.log(input)
     for(i = 0; i < 5; i++) {
        if(input[i].title == '' || input[i].url == ''  || input[i].contrib == '') {
            return false
        }
    } return true
}


function panelMsg(err, msg) {
    var d = new Date()
    var time = d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()
    var node = null
    var element = document.getElementById("serverPanel")

    //list object in appropriate way 
    if(msg.length > 0) {
        var msgTemp = ''
        var data = JSON.parse(msg[0])
        for(var i = 0; i<data.length; i++) {
            var entry = '['+i+']'+': '+data[i].title+' '+data[i].contrib+' @'+data[i].contrib+' '+data[i].url       
            msgTemp = msgTemp+',    '+entry 
       } 
     msg = msgTemp
    }

 
    if(typeof err == 'string') {
        node = document.createTextNode(time+" - <ERROR> "+err)
    } else {
        node = document.createTextNode(time+"- <OK> "+msg)
    }
    element.appendChild(node)
    element.appendChild(document.createElement("br"))
}


