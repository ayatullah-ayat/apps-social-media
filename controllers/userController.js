const User = require('../models/User')




exports.login = function(req, res) {
    const user = new User(req.body)
    user.login()
    .then((responseMessage) => res.send(responseMessage))
    .catch((error) => res.send(error))
}


exports.logout = function() {
    
}
exports.register = function(req, res) {
    let user = new User(req.body);
    user.register();
    if(user.errors.length) {
        res.send(user.errors)
    }else{
        res.send('congrats!')
    }
}
exports.home = function(req, res) {
    res.render('home-guest')
}