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
const config = require('./config/config');
const Entry = require('./models/entry-model').entry
const User = require('./models/user-model')

let corsOption = {
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
mongoose.connect(config.mongodb.dbURI, { useNewUrlParser: true, useCreateIndex: true })

// middleware
app.use(bodyParser.json())
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/v1/', index);
app.use('/verify', auth)

const router = express.Router();
router.route('/entry')
  .post((req, res) => {
    console.log(req.body.title)
    if (!req.user) console.log('you shall not pass!')
    const { body } = req
    let entry = new Entry()
    entry.body = body.body
    entry.title = body.title
    entry.user = req.user._id
    entry.save((err) => {
      if (err) res.send(err)
      req.user.entries.push(entry)
      req.user.save((err) => {
        if (err) res.send(err)
        res.json({msg: 'entry saved'})
        })
      })
    console.log(entry)
  })
router.route('/entry')
  .get((req, res) => {
    if (!req.user) console.log('you shall not pass!')
    User.findById(req.user, (err, user) => {
        if (err) res.send(err);
      })
      .populate('entries')
      .exec((err, user) => {
        console.log(user)
        if (err) res.send(err)
        res.json(user.entries)
      })
    // Entry.find((err, entry) => {
    //   console.log(entry)
    //    if (err) res.send(err)
    //    res.json(entry)
    //  })
  });

app.use('/verify', router)

//set up routes
const userRoutes = require('./routes/user-routes.js')
const nonVerifiedRouter = express.Router();
userRoutes(nonVerifiedRouter)
app.use('/api', nonVerifiedRouter)

module.exports = app;
