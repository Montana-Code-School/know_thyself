const Prompt = require('../models/entry-model').prompt
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
}
