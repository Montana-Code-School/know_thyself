const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const auth = require('./routes/auth-routes')
const index = require('./routes/index');
const keys = require('./keys');
const Entry = require('./models/entry-model').entry

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

//connect to mongodb
mongoose.connect(keys.mongodb.testuri, {useNewURLParser: true})

// middleware
app.use(bodyParser.json())
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/v1/', index);
app.use('/verify', auth)
app.use('/verify/entry', (req, res) => {
  if (!req.user) console.log('you shall not pass!')
  const { body } = req
  const entry = new Entry()
  for (let key in body) {
    if (body.hasOwnProperty(key)) {
      entry[key] = body[key]
    }
  }
})

//set up routes
const router = express.Router();
app.use('/api', router)
const userRoutes = require('./routes/user-routes.js')
userRoutes(router)

module.exports = app;
