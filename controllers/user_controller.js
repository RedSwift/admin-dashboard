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

const login = function (req, res) {
  if (!req.body.email || !req.body.password) res.status(401).json('Invalid email or password')
  else {
    User.findOne({email: req.body.email}, function (err, user) {
      if (err) return res.status(401).json(`Error occured: ${err}`)

      user.authenticate(req.body.password, (err, isMatch) => {
        if (err || !isMatch) return res.status(401).json(`Invalid email or password`)
        return res.status(200).json(`logging you in`)
      })
    })
  }
}

module.exports = {
  newUser: newUser,
  login: login
}
