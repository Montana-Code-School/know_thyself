const express = require('express');
const router = express.Router();
const Entry = require('../models/entry-model').entry;
const User = require('../models/user-model');

  router.route('/entry')
    .post((req, res) => {
      if (!req.user) console.log('you shall not pass!')
      const { body } = req
      let entry = new Entry()
      entry.body = body.body
      entry.title = body.title
      entry.user = req.user._id
      entry.save((err) => {
        if (err) res.send(err)
        req.user.entries.push(entry)
        req.user.save((err) => {
          if (err) res.send(err)
          res.json({msg: 'entry saved'})
          })
        })
    })
    .get((req, res) => {
      console.log("in verified-routes")
      if (!req.user) console.log('you shall not pass!')
      User.findById(req.user, (err, user) => {
        if (err) res.send(err);
      })
      .populate('entries')
      .exec((err, user) => {
        if (err) res.send(err)
        res.json(user.entries)
      })
    });

module.exports = router
