const User = require('../models/User')

exports.login = function(req, res) {
    const user = new User(req.body)
    user.login()
    .then((responseMessage) => {
        // setup session
        req.session.user = {favColor: "white", username: user.data.username}
        res.send(responseMessage)
    })
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
        res.send('congrats! you have successfully registerrr!')
    }
}
exports.home = function(req, res) {
    // get trus by checking session
    if(req.session.user){
        res.render('home-dashboard')
    }else{
        res.render('home-guest')
    }
}