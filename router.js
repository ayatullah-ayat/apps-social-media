const express = require('express');
const router = express.Router();
// import controllers function/module
const userController = require('./controllers/userController')
const postController = require('./controllers/postController')
// user related router
router.get('/', userController.home);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout)

// post related router
router.get('/create-post', userController.mustBeLoggedIn, postController.viewCreateScreen)
router.post('/create-post', userController.mustBeLoggedIn, postController.createPost)
module.exports = router;
