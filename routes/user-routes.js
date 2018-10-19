const Entry = require('../models/entry-model').entry
const User = require('../models/user-model')
const Prompt = require('../models/entry-model').prompt

// post and view writing prompt entries
module.exports = (router) => {
  // for development only. Should be deleted before production.
  router.route('/users')
    .post((req, res) => {
      let user = new User();
      user.username = req.body.username;
      user.save((err) => {
        if (err) res.send(err)
        res.json({msg: 'u did it'})
      })
    })
    .get((req, res) => {
      User.find((err, user) => {
         if (err) res.send(err)
         res.json(user)
        });
    });

  // get and post journal entries to user id
  router.route('/users/:user_id/entries')
    .post((req, res) => {
      User.findById(req.params.user_id, (err, user) => {
        if (err) res.send(err)
      let entry = new Entry()
      // entry.body = req.body.body
      // entry.title = req.body.title
      // entry.user = user._id
      // entry.save((err) => {
      //   if (err) res.send(err)
      //   user.entries.push(entry)
      //       user.save((err) => {
      //         if (err) res.send(err)
      //         res.json({msg: 'entry saved'})
      //       })
      //   })
      })
    })

    .get((req, res) => {
        User.findById(req.params.user_id, (err, user) => {
            if (err) res.send(err);
          })
          .populate('entries', 'body')
          .exec((err, user) => {
            if (err) res.send(err)
            res.json(user.entries)
          })
    })

  // get or delete specific journal entry
  router.route('/users/:user_id/:entry_id')
    .get((req, res) => {
      Entry.findById(req.params.entry_id, (err, entry) => {
        if (err) res.send(err)
        res.json(entry)
      })
    })

    .delete((req, res) => {
      //delete one region by id
      Entry.deleteOne({
        _id: req.params.entry_id
      }, (err, entry) => {
        if (err) res.send(err);
      });
      User.findById(req.params.user_id, (err, user) => {
        if (err) res.send(err)
        for (var i = 0; i < user.entries.length; i++) {
          if (user.entries[i] == req.params.entry_id) {
            user.entries.splice(i, 1)
          }
        }
        user.save((err) => {
          if (err) res.send(err)
          res.json({msg: "entry deleted"})
        })
      })
    })


  // get prompts
  router.route('/prompts')
    .post((req, res) => {
      let prompt = new Prompt();
      prompt.body = req.body.body;
      prompt.save((err) => {
        if (err) res.send(err)
        res.json({msg: 'u did it'})
      })
    })
    .get((req, res) => {
      Prompt.find((err, prompt) => {
         if (err) res.send(err)
         res.json(prompt)
        });
    });
}
