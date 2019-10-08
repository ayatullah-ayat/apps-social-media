// init express
const express = require('express');
const app = express();
// set up views folder to render html docs
app.set('views', 'views');
app.set('view engine', 'ejs')

//to receive data
app.use(express.urlencoded({extended: false}));
app.use(express.json());
// set up public folder to use publicly everywhere
app.use(express.static('public'))
// create a router js for organized code
// import the module.export...
const router = require('./router') // requiring our own file
// '/' uses for basic url
app.use('/', router)
app.listen(3000)