const jwt = require('jsonwebtoken');
const someOtherSecret = process.env.SOME_OTHER_SECRET

const createToken = function(auth) {
  console.log( "auth", auth)
  return jwt.sign({
      id: auth.id
    }, someOtherSecret,
    {
      expiresIn: 60 * 120
    });
};

module.exports = {
  generateToken: function(req, res, next) {
    req.token = createToken(req.auth);
    console.log( "generateToken")
    return next();
  },
  sendToken: function(req, res) {
    res.setHeader('x-auth-token', req.token);
    console.log("send token")
    return res.status(200).send(JSON.stringify(req.user));
  }
};
