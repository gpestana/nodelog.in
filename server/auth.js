var basicAuth   = require('basic-auth'),
credentials     = require('../private/credentials.js')  

function auth(req, res, clbk) {
    function unauthorized(res) {
        res.set("WWW-Authenticate", "Basic realm: Authorization required")
        return res.send(401)
    }

    var user = basicAuth(req)

    if(!user || !user.name || !user.pass) return unauthorized(res)
    if (user.name == credentials.user
        && user.pass == credentials.pass) return clbk()
    else return unauthorized(res)
}

exports.auth = auth
