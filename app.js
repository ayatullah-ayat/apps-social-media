// init express
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');

const app = express();
//configure session options
let sessionOptions = session({
    secret: "this is my first session work",
    store: new MongoStore({client: require('./db')}),
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 60, httpOnly: true}
})
app.use(sessionOptions);
app.use(flash())
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
module.exports = app;