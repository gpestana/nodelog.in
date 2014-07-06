var OAuth   = require('oauth').OAuth,
credentials = require('../private/credentials.js'),
_           = require('underscore')


var oauth = new OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    credentials.key,
    credentials.secret,
    '1.0A',
    null,
    'HMAC-SHA1'
)

function getContribPicture(handler, size, clbk) {
    oauth.get(
        'https://api.twitter.com/1.1/users/show.json?screen_name='+handler,
        credentials.token_key,
        credentials.token_secret,
        function(err, data, res) {
            if(err) {
                clbk('twitter: request problem', null)
                return
            }
            
            data = JSON.parse(data) 
            if(data.errors) {
                clbk('twitter: handler does not exist', null)
                return
            } else {
                clbk(null, data.profile_image_url_https.replace('normal', size)) 
            }
        })
}



//CLI
function main() {
    var handlers = _.rest(process.argv, 2)
    var size = "bigger"
    
    handlers.forEach(function(handle) {
        getContribPicture(handle, size)
    })

}

exports.getContribPicture = getContribPicture
