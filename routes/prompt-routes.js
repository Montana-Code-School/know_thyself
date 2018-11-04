const Prompt = require('../models/entry-model').prompt
const Tip = require('../models/entry-model').tip

// post and view writing prompt entries
module.exports = (router) => {
  //  add delete
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

    router.route('/tips')
      .post((req, res) => {
        let tip = new Tip();
        tip.body = req.body.body;
        tip.save((err) => {
          if (err) res.send(err)
          res.json({msg: 'u did it'})
        })
      })
      .get((req, res) => {
        Tip.find((err, tip) => {
          if (err) res.send(err)
          res.json(tip)
        });
      });
}
