const jwt = require('jsonwebtoken')
const User = require('../models/user-model')

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

    console.log(decoded)
    if(err){
      console.log("err in auth-routes")
      res.status(401).end()
    } else {
      console.log("not err in auth-routes")
      // const id = decoded.sub
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
