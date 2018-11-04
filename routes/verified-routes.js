const express = require('express');
const router = express.Router();
const Entry = require('../models/entry-model').entry;
const User = require('../models/user-model');
const Habit = require('../models/habit-model').habit

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
        console.log("finding user by id")
        if (err) res.send(err);
      })
      .populate('entries')
      .exec((err, user) => {
        if (err) res.send(err)
        res.json(user.entries)
      })
    });



  router.route('/habit')
    .post((req, res) => {
      if (!req.user) console.log('you shall not pass!')
      console.log(req)
      const { body } = req 
      let habit = new Habit()
      habit.title = body.title
      habit.reps = body.reps
      habit.initial = body.initial
      habit.complete = body.complete
      habit.finished = body.finished
      habit.user = req.user._id
      habit.save((err) => {
        if (err) res.send(err)
        req.user.habits.push(habit)
        req.user.save((err) => {
          if (err) res.seng(err)
          res.json({msg: 'habit saved'})
        })
      })
    })
    .get((req, res) => {
      console.log('in verified-routes')
      if (!req.user) console.log('you shall not pass!')
      User.findById(req.user, (err, user) => {
        if (err) res.send(err);
      })
      .populate('habits')
      .exec((err, user) => {
        if (err) res.send(err)
        res.json(user.habits)
      })
    })


module.exports = router
