const express = require('express');
const router = express.Router();
// import controllers function/module
const userController = require('./controllers/userController')


router.get('/', userController.home);
router.post('/register', userController.register);
module.exports = router;
