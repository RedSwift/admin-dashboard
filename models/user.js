const mongoose = require('mongoose')
const uuid = require('uuid')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  password: {type: String, required: true, minlength: 4},
  email: {type: String, required: true},
  auth_token: String
})

userSchema.pre('save', function (done) {
  const user = this

  if (!user.auth_token) user.auth_token = uuid.v4()
  bcrypt.genSalt(8, (err, salt) => {
    if (err) return done(err)

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return done(err)
      user.password = hash
      done()
    })
  })
})

userSchema.methods.authenticate = function (password, callback) {
  bcrypt.compare(password, this.password, callback)
}

let User = mongoose.model('User', userSchema)

module.exports = User
