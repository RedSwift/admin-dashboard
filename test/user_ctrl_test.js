/* globals after describe it */
const expect = require('chai').expect
const supertest = require('supertest')
require('../server')
const api = supertest(`http://localhost:3000`)
const User = require('../models/user')

describe('POST /signup', () => {
  it('should allow post for new user', function (done) {
    this.timeout(5000)
    api.post('/api/signup')
      .set('Accept', 'application/json')
      .send({
        name: 'Dominic',
        email: 'tester@gmail.com',
        password: '1234',
        password_confirmation: '1234',
        signup_token: process.env.SIGNUP_TOKEN
      })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res.status).to.eq(201)
        done()
      })
  })
  after(function (done) {
    User.remove({email: 'tester@gmail.com'}, function (err, res) {
      if (err) console.log(err)
      else done()
    })
  })
})

describe('POST /login', () => {
  it('should allow valid users to login', (done) => {
    api.post('/api/login')
      .set('Accept', 'application/json')
      .send({
        email: process.env.EMAIL,
        password: process.env.PASSWORD
      })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res.status).to.eq(200)
        expect(res.body.message).to.eq('logging you in')
        done()
      })
  })
})
