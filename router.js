console.log('i am executed/invoked immediately')
const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('home-guest.js')
})
module.exports = router;
