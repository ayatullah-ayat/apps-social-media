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

app.use(function(req, res, next) {
    res.locals.user = req.session.user
    next() 
})

app.set('views', 'views');
app.set('view engine', 'ejs')


app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(express.static('public'))

const router = require('./router') 

app.use('/', router)
module.exports = app;