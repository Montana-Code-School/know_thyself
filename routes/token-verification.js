const jwt = require('jsonwebtoken')
const User = require('../models/user-model')

// here we grab the token from the headers, and verify it, once decoded, we can
// see that it contains a user_id, we then search the db for that id, and return
// the user attached to the request.  We then move back to login.js
module.exports = (req, res, next) => {
  console.log("authorization")
  if(!req.headers.authorization) {
    res.status(401).end()
  }

  const someOtherSecret = process.env.SOME_OTHER_SECRET
  const token = req.headers.authorization.split(" ")[1]

  return jwt.verify(token, someOtherSecret, (err, decoded) => {
    let id;
    if (decoded.sub) {
      id = decoded.sub
    } else  id = decoded.id
    if(err){
      res.status(401).end()
    } else {
      console.log("in token-verification")
      // find user and attach to request
      return User.findById(id, (err, user) => {
        console.log("found user by id")
        if (err) res.status(401).end()
        req.user = user

        return next()
      })
    }
  })
}
