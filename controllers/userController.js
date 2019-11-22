const User = require('../models/User')
const Post = require('../models/Post')
const Follow = require('../models/Follow')
// user needs to loggedin to create new post
exports.mustBeLoggedIn = function(req, res, next) {
    if(req.session.user){
        next()
    }else{
        req.flash('errors', 'You must be logged in, to perform this page')
        req.session.save(function() {
            res.redirect('/')
        })
    }
}
exports.login = function(req, res) {
    let user = new User(req.body)
    user.login()
    .then((responseMessage) => {
        console.log(user)
        req.session.user = {avatar: user.avatar, username: user.data.username, _id: user.data._id}
        // redirect the homepage after successfully save in the database
        req.session.save(function() {
            res.redirect('/')
        })
    })
    .catch((error) => {
        req.flash('errors', error)
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
exports.register = async function(req, res) {
    let user = new User(req.body);
    user.register()
    .then(() => {
        console.log(user)
        req.session.user = {avatar: user.avatar, username: user.data.username, _id: user.data._id}
        req.session.save(function(){
            res.redirect('/')
        })
    })
    //catch start
    .catch((regErrors) => {
        regErrors.forEach((err) => {
            req.flash('regError', err)
        })
        req.session.save(function() {
            res.redirect('/')
        })
    })
    //catch end
}
exports.home = function(req, res) {
    // get trus by checking session
    if(typeof req.session.user === 'object'){
        res.render('home-dashboard')
    }else{
        res.render('home-guest', {regError: req.flash('regError')})
    }
}

exports.ifUserExists = function(req, res, next) {
    User.findByUserName(req.params.username).then((userDocument) => {
        // save req object with an property profileUser
        req.profileUser = userDocument
        console.log('pass from ifUserExists')
        next()
    }).catch((err) => { 
        res.render('404')
    })
}

exports.profilePostsScreen = function(req, res) {
    // query posts with a certain author name
    Post.findPostsByAuthor(req.profileUser._id)
    .then((posts) => {
        res.render('profile', {
            posts: posts,
            isVisitorProfile: req.isVisitorProfile,
            profileUserName: req.profileUser.username,
            profileAvatar: req.profileUser.avatar,
            isFollowing: req.isFollowing
        })
    })
    .catch(() => {
        res.render('404')
    })    
}

exports.sharedProfileData = async function(req, res, next){
    let isVisitorProfile = false
    let isFollowing = false
    if(req.session.user){
        isFollowing = await Follow.isVisitorFollowing(req.profileUser._id, req.visitorId)
        isVisitorProfile = req.profileUser._id.equals(req.session.user._id)
    }
    req.isFollowing = isFollowing
    req.isVisitorProfile = isVisitorProfile
    console.log("pass from shardProfileData")
    next()
}

exports.profileFollowersScreen = async function(req, res) {
    try {
        let followers = await Follow.getFollowersById(req.profileUser._id)

        res.render('profile-followers', {
            followers: followers,
            profileUserName: req.profileUser.username,
            profileAvatar: req.profileUser.avatar,
            isFollowing: req.isFollowing,
            isVisitorProfile: req.isVisitorProfile
        })
    } catch {
        res.render("404")
    }
}