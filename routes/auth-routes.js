const jwt = require('jsonwebtoken')
const User = require('../models/user-model')

module.exports = (req, res, next) => {
  if(!req.headers.authorization) {
    res.status(401).end()
  }

  const someOtherSecret = process.env.SOME_OTHER_SECRET
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
