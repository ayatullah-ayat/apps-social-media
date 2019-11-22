const Follow = require('../models/Follow')
const Swal = require('sweetalert2')

exports.addFollow = function(req, res) {
    let follow = new Follow(req.params.username, req.visitorId)

    follow.create()
    .then(() => {
        req.flash('success', `You have successfully following ${req.params.username}`)
        req.session.save(() => {
            res.redirect(`/profile/${req.params.username}`)
        })
    })
    .catch((errors) => {
        errors.forEach((err) => {
            req.flash('errors', err)
        })
       req.session.save(() => {
           res.redirect('/')
       })
    })
}


exports.removeFollow = function(req, res) {
    let follow = new Follow(req.params.username, req.visitorId)

    follow.removeFollow()
    .then((resolve) => {
        req.flash('success', `You have successfully unfollowing ${req.params.username}`)
        req.session.save(() => {
            res.redirect(`/profile/${req.params.username}`)
        })
    })
    .catch(errors => {
        errors.forEach(err => {
            req.flash('errors', err)
        })
        req.session.save(() => {
            res.redirect('/')
        })
    })
}