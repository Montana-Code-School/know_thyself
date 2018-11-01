const express = require('express');
const validator = require('validator');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = new express.Router();

function validateSignupForm(payload) {
  console.log("it's validating")
  console.log(payload, "payload")
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

router.post('/signup', function (req, res, next) {
  console.log("it got to signup")
  //session:false in passport options so that it wont save user in session
  console.log(req.body)
  const validationResult = validateSignupForm(req.body);
  console.log(validationResult)
  if(!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  return passport.authenticate('passport-signup', (err, token, userData) => {
    console.log("in passport.auth", token)
    // const token = jwt.sign(payload, process.env.SOME_SECRET);
    if (err) {
      console.log("error",err)
      if (err.name === 'MongoError' && err.code === 11000) {
        // the 11000 Mongo code is for a duplication email error
        // the 409 HTTP status code is for conflict error
        return res.status(409).json({
          success: false,
          message: 'Check the form for errors.',
          errors: {
            email: 'This email is already taken.'
          }
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }
    return res.json({
      success: true,
      message: 'You have successfully signed up! Now you should be able to log in.',
      token,
      user: userData
    });
  })(req, res, next);
});

router.post('/login', (req, res, next) => {
  console.log("got to login");
  const validationResult = validateSignupForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: "did not validate",
      errors: validationResult.errors
    });
  }

  return passport.authenticate('passport-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: "incorrect credentials"
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }

    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: userData
    });
  })(req, res, next);
});


module.exports = router;
