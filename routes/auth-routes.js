const jwt = require('jsonwebtoken')
const config = require('../config/config')
const User = require('../models/user-model')

module.exports = (req, res, next) => {
  console.log("authorization")
  if(!req.headers.authorization) {
    res.status(401).end()
  }

  const { someOtherSecret } = config.googleAuth
  const token = req.headers.authorization.split(" ")[1]

  return jwt.verify(token, someOtherSecret, (err, decoded) => {
    if(err){
      res.status(401).end()
    } else {
      const { id } = decoded
      // find user and attach to request
      return User.findById(id, (err, user) => {
        if (err) res.status(401).end()
        req.user = user
        return next()
      })
    }
  })
}
