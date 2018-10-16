const router = require('express').Router();
const passport = require ('passport');
// auth login renders login page
router.get('/login', (req, res) => {
  res.render('login');
});

//auth Logout
router.get('/logout', (req, res) => {
  //handle with passport
  //logout
  req.logout();
  res.redirect('/');
  //to home page
});
//auth with google
router.get('/google', passport.authenticate('google', {
  //scope what we want to retrieve
  scope: ['profile']
}));

//callback route for google to redirect to
//now we have code and can access profile information
//we skip over to passport-setup and move to the callback before carrying on
router.get('/google/redirect', passport.authenticate('google'),(req, res) => {
  // res.send(req.user)
  res.redirect('/profile/');
})
module.exports = router;
