const User = require('../models/user')

const loggedIn = function (req, res, next) {
  let userEmail = req.get('email')
  let authToken = req.get('auth_token')

  if (!userEmail || !authToken) return res.status(401).json({error: 'Unauthorized access'})

  User.findOne({email: userEmail, auth_token: authToken}, (err, user) => {
    if (err || !user) return res.status(401).json({error: 'Unauthorized access'})

    req.currentUser = user
    next()
  })
}

const newUser = function (req, res) {
  let makeUser = new User()
  makeUser.name = req.body.name
  makeUser.email = req.body.email
  makeUser.password = req.body.password

  makeUser.save((err, result) => {
    if (err) res.status(401).json(`Error occured while saving: ${err}`)
    else res.status(201).json('success')
  })
}

const login = function (req, res) {
  if (!req.body.email || !req.body.password) res.status(401).json('Invalid email or password')
  else {
    User.findOne({email: req.body.email}, function (err, user) {
      if (err) return res.status(401).json(`Error occured: ${err}`)

      user.authenticate(req.body.password, (err, isMatch) => {
        if (err || !isMatch) return res.status(401).json(`Invalid email or password`)
        return res.status(200).json({message: 'logging you in', auth_token: user.auth_token})
      })
    })
  }
}

module.exports = {
  newUser: newUser,
  login: login,
  loggedIn: loggedIn
}
