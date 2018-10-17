const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const index = require('./routes/index');
const keys = require('./keys');
const app = express();

var corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};

app.use(cors(corsOption));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// middleware
app.use(bodyParser.json())

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI, {useNewURLParser: true})

// middleware
app.use(bodyParser.json())
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/v1/', index);

//set up routes
const router = express.Router();
app.use('/api', router)
const userRoutes = require('./routes/user-routes.js')
userRoutes(router)

//do we need this
// //creat home route
// app.get('/',(req, res)=> {
//   res.render('home');
// });

module.exports = app;
