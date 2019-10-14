const Post = require('../models/Post')


exports.viewCreateScreen = function(req, res) {
    res.render('create-post')
}

exports.createPost = function(req, res) {
    let post = new Post(req.body, req.session.user._id)
    post.create()
    .then(function(recieveData) {
        res.send("successfully post")
    })
    .catch(function(err) {
        res.send(err)
    })
}