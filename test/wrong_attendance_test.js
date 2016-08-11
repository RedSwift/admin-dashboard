/* globals describe context it */
const expect = require('chai').expect
const supertest = require('supertest')
require('../server')
const api = supertest(`http://localhost:3000`)

describe('Unauthorized access to Attendance', () => {
  context('GET /api/attendance', () => {
    it('should NOT allow get all attendance', function (done) {
      api.get('/api/attendance')
        .set('Accept', 'application/json')
        .expect(401, done)
    })
  })
  context('POST /api/attendance', () => {
    it('should NOT allow post for attendance', function (done) {
      api.post('/api/attendance/new')
        .set('Accept', 'application/json')
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
        .expect(401, done)
    })
  })
})
