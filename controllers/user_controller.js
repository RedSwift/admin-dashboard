const User = require('../models/user')

const newUser = function (req, res) {
  if (!req.body.signup_token || req.body.signup_token !== process.env.SIGNUP_TOKEN) return res.status(401).json(`Invalid Signup Token`)
  else {
    let makeUser = new User()
    makeUser.name = req.body.name
    makeUser.email = req.body.email
    makeUser.password = req.body.password

    makeUser.save((err, result) => {
      if (err) res.status(401).json(`Error occured while saving: ${err}`)
      else res.status(201).json('success')
    })
  }
}

module.exports = {
  newUser: newUser
}
