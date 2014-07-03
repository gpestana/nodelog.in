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
    
    console.log("add day")
    console.log(formData)

    socket.emit('admin add day', [id, formData])
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
    var d = new Date()
    var h = d.getHours()
    var m = d.getMinutes()
    var s = d.getSeconds() 
    var node = document.createTextNode(h+":"+m+":"+s+" - ERR: "+err+" | MSG: "+msg)
    var element = document.getElementById("serverPanel")

    element.appendChild(node)
    element.appendChild(document.createElement("br"))
})
