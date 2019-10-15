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

// view single post page
exports.viewSinglePost = async function(req, res) {
    try {
        let post = await Post.findSingleById(req.params.id)
        res.render('single-post-screen', {post: post})
    }catch {
        res.send("404 file is going here...")
    }
}