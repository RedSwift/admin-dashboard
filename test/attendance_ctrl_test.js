/* globals describe it context after */
const expect = require('chai').expect
const supertest = require('supertest')
require('../server')
const api = supertest(`http://localhost:3000`)
const Attend = require('../models/attendance.js')

var attendCount
Attend.count({}, (err, count) => {
  if (err) console.log(err)
  else attendCount = count
})

describe('Valid actions with Attendance', () => {
  var id
  context('GET /api/attendance', () => {
    it('should allow get all attendance', function (done) {
      this.timeout(5000)
      api.get('/api/attendance')
        .set('Accept', 'application/json')
        .set('email', process.env.EMAIL)
        .set('auth_token', process.env.AUTH_TOKEN)
        .end((err, res) => {
          expect(err).to.be.a.null
          expect(res.status).to.eq(200)
          expect(res.body.length).to.eq(attendCount)
          done()
        })
    })
  })
  context('POST /api/attendance', () => {
    it('should allow post for attendance', function (done) {
      this.timeout(10000)
      api.post('/api/attendance/new')
        .set('Accept', 'application/json')
        .set('email', process.env.EMAIL)
        .set('auth_token', process.env.AUTH_TOKEN)
        .send({
          date: '08-Aug-16',
          people: [{
            name: 'Dominic',
            score: 'Yes',
            notes: ''
          }, {
            name: 'William',
            score: 'No',
            notes: ''
          }]
        })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res.body.date).to.eq('08-Aug-16')
          id = res.body._id
          expect(res.body.people.length).to.eq(2)
          done()
        })
    })
  })
  after(function (done) {
    Attend.remove({_id: id}, function (err) {
      if (err) console.log(err)
      else done()
    })
  })
})
