const User = require('../models/User')

exports.login = function() {

}
exports.logout = function() {
    
}
exports.register = function(req, res) {
    let user = new User(req.body);
    console.log(user.data.username)
    res.send('Thank you for registration')
}
exports.home = function(req, res) {
    res.render('home-guest')
}