const Post = require('../models/Post')


exports.viewCreateScreen = function(req, res) {
    res.render('create-post')
}

exports.createPost = function(req, res) {
    let post = new Post(req.body, req.session.user._id)
    post.create()
    .then(function(postId) {
        req.flash("success", "You have successfully post")
        req.session.save(() => res.redirect(`/post/${postId}`))
    })
    .catch(function(err) {
        err.forEach((e) => {
            req.flash("errors", e)
        })
        req.session.save(() => {
            res.redirect('/create-post')
        })
    })
}

// view single post page
exports.viewSinglePost = async function(req, res) {
    try {
        let post = await Post.findSingleById(req.params.id, req.visitorId)
        res.render('single-post-screen', {post: post})
    }catch {
        res.render('404')
    }
}

exports.viewEditScreen = async function(req, res) {
    try{
        let post = await Post.findSingleById(req.params.id, req.visitorId)
        if(post.isVisitorOwner){
            res.render('view-edit', {post: post})
        }else {
            req.flash("errors", "You do not have permission to perform this region")
            req.session.save(function() {
                res.redirect("/")
            })
        } 
    }catch {
        res.render('404')
    }
}

exports.edit = function(req, res) {
    let post = new Post(req.body, req.visitorId, req.params.id)

    post.update().then((status) => {
        if(status == 'success') {
            req.flash("success", "You have successfully updated")
            req.session.save(function() {
                res.redirect(`/post/${req.params.id}/edit`)
            })
        }else {
            post.errors.forEach((err) => {
                req.flash('errors', err)
            })
            req.session.save(function() {
                res.redirect(`/post/${req.params.id}/edit`)
            })
        }
    })
    .catch(() => {
        req.flash('errors', "You do not have permission to perform that action")
        req.session.save(function() {
            res.redirect('/')
        })
    })
}