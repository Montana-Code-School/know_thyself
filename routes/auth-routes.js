const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = (req, res, next) => {
  if(!req.headers.authorization) {
    res.status(401).end()
  }

  const { someOtherSecret } = config.googleAuth
  const token = req.headers.authorization.split(" ")[1]

  return jwt.verify(token, someOtherSecret, (err, decoded) => {
    if(err){
      console.error(err)
      res.status(401).end()
    }

    console.log(decoded)
  })

  next()
}
