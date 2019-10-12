const User = require('../models/User')

exports.login = function(req, res) {
    const user = new User(req.body)
    user.login()
    .then((responseMessage) => {
        // setup session
        req.session.user = {favColor: "white", username: user.data.username}
        // redirect the homepage after successfully save in the database
        req.session.save(function() {
            res.redirect('/')
        })
    })
    .catch((error) => {
        req.flash('info', error)
        req.session.save(function(){
            res.redirect('/')
        })
    })
}


exports.logout = function(req, res) {
    // destroy the session after user logout and redirect the homepage
    req.session.destroy(function(){
        res.redirect('/')
    })
}
exports.register = function(req, res) {
    let user = new User(req.body);
    user.register();
    if(user.errors.length) {

        user.errors.forEach(err => {
            req.flash('regError', err)
        })
        req.session.save(function() {
            res.redirect('/')
        })
    }else{
        res.send('congrats! you have successfully registerrr!')
    }
}
exports.home = function(req, res) {
    // get trus by checking session
    if(req.session.user){
        res.render('home-dashboard', {username: req.session.user.username})
    }else{
        res.render('home-guest', {errors: req.flash('info'), regError: req.flash('regError')})
    }
}