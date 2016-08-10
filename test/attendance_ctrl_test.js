/* globals describe it context */
const expect = require('chai').expect
const supertest = require('supertest')
require('../server')
const api = supertest(`http://localhost:3000`)

describe('GET, SHOW, POST, PUT, DELETE attendance', () => {
  context('POST /api/attendance', () => {
    it('should allow post for attendance', function (done) {
      this.timeout(10000)
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
        .end((err, res) => {
          expect(err).to.be.null
          expect(res.body.date).to.eq('08-Aug-16')
          expect(res.body.people.length).to.eq(2)
          done()
        })
    })
  })
})
