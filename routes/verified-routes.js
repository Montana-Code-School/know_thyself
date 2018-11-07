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

  router.route('/habit')
    .post((req, res) => {
      if (!req.user) console.log('you shall not pass!')
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
          if (err) res.send(err)
          res.json({msg: 'habit saved'})
          })
        })

    })

    .get((req, res) => {
      if (!req.user) console.log('you shall not pass!')
      User.findById(req.user, (err, user) => {
        console.log("finding user by id")
        if (err) res.send(err);
      })
      .populate('habits')
      .exec((err, user) => {
        console.log("in exec")
        if (err) res.send(err)
        res.json(user.habits)
      })
    })

  router.route('/habit/:habit_id')
    .put((req, res) => {
      if (!req.user) console.log('thou shall not go on!')
      Habit.findById(req.params.habit_id, (err, habit) => {
        if (err) res.send(err)
        habit.save((err, user) => {
          if (err) res.send(err)
          user.save((err, user) => {
            if (err) res.send(err)
            res.json(habit)
          })
        })
      })
    })

    .delete(function(req, res) {
      if (!req.user) console.log('thou shall not go on!')
      Habit.deleteOne({
        _id: req.params.habit_id
      }, function(err, habit) {
        if (err)
          res.send(err);
      });
      User.findById(req.user._id, function(err, user) {
        if (err)
          res.send(err)
        for (var i = 0; i < user.habits.length; i++) {
          if (user.habits[i]._id == req.params.habit_id) {
            user.habits.splice(i, 1)
          }
        }
        user.save((err) => {
          if (err) res.send(err)
          res.json({msg: 'deleted habit'})
        })
      })
    })

module.exports = router
