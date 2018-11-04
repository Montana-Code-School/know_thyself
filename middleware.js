const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const auth = require('./routes/token-verification')
const index = require('./routes/index');
const Entry = require('./models/entry-model').entry
const User = require('./models/user-model');
const UserLocal = require('./models/user-model');
const localAuth = require('./routes/local-auth');
const passport = require('passport');
require ('passport-local')
// setting up routes
const verifiedRoutes = require('./routes/verified-routes');
const promptRoutes = require('./routes/prompt-routes')
const router = express.Router();
promptRoutes(router)

let corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};

// connect to mongodb
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useCreateIndex: true })

// middleware
// add auth as a 2rd argument to routes that we want to send through verification
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
///local signup
const localSignupStrategy = require('./passport-signup');
passport.use('passport-signup', localSignupStrategy)
const localLoginStrategy = require('./passport-login');
passport.use('passport-login', localLoginStrategy)
app.use('/auth', localAuth)
// should happen only in production
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/v1/', index);
app.use('/api', router)
app.use('/verify', auth)
app.use('/verify', router)
app.use('/verify', verifiedRoutes)


module.exports = app;
