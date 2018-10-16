const router = require('express').Router();
const authCheck = (req, res, next) => {
  //function for checking if user is logged inspect
  if(!req.user){
    //if user is not logged in redirect them
    res.redirect('/auth/login')
  } else {
    //if logged in
    next();
  }
}
router.get('/', authCheck, (req, res) => {
  res.render('profile', {user: req.user});
})

module.exports = router;
