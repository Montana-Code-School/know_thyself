const express = require('express');
const router = express.Router();
const User = require('../models/user-model');
const jwt = require('jsonwebtoken');

router.route('/passwordreset')
  .put((req, res) => {
    console.log(req.body)
    User.findOne({email: req.body.email }, (err, user) => {
      if (err) {console.log(err, "not a user")}
      if (!user) {
        console.log("not a user")
        const error = new Error('Incorrect email');
        error.name = 'IncorrectCredentialsError';
        return done(error);
      }
      else{
      console.log(user, "in else")
      if (req.body.secret === user.secret) {
      console.log("they match")
      // res.json({msg:'they are a user'})
      delete user.password
      user.password = req.body.password
      user.save()
      console.log(user, "user saved, new password added")
      const payload = {
        sub: user._id
      }
      const token = jwt.sign(payload, process.env.SOME_OTHER_SECRET);
      return res.json({
            success: true,
            message: 'You have successfully signed up!',
            token,
            user
          })
      // return done(null, token, user);
    }
    }
    })
  })

  module.exports = router
