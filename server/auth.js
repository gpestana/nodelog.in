var passport    = require('passport'),
LocalStrategy   = require('passport-local').Strategy,
privateData     = require('../private/credentials.js')

passport.use(new LocalStrategy(function(username, password, done) {
    console.log(username)
    console.log(password)
    if(username == privateData.username && password == privateData.password) {
        return done(null, {user: 'admin'})
    } else {
        return done(null, false, {message: "incorrect login"})
    }
}))


exports.passport = passport
