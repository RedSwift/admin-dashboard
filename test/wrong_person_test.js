/* globals describe it context */
const expect = require('chai').expect
const supertest = require('supertest')
require('../server')
const api = supertest(`http://localhost:3000`)

describe('Unauthorized access to Person', () => {
  context('GET /api/people', () => {
    it('should NOT GET all people', function (done) {
      this.timeout(5000)
      api.get('/api/people')
        .set('Accept', 'application/json')
        .expect(401, done)
    })
  })
  context('POST /api/person/new', () => {
    it('should NOT POST new person', (done) => {
      api.post('/api/person/new')
      .set('Accept', 'application/json')
      .send({
        name: 'Tester'
      })
      .expect(401, done)
    })
  })
  context('SHOW /api/person/:id', () => {
    it('should SHOW a person', (done) => {
      api.get('/api/person/' + process.env.TEST_ID)
        .set('Accept', 'application/json')
        .expect(401, done)
    })
  })
  context('PUT /api/person/:id', () => {
    it('should allow put for a person', (done) => {
      api.put('/api/person/' + process.env.TEST_ID)
        .set('Accept', 'application/json')
        .send({
          name: 'Not Tester'
        })
        .expect(401, done)
    })
  })
  context('DELETE /api/person/:id', () => {
    it('should allow DELETE for a person', (done) => {
      api.delete('/api/person/' + process.env.TEST_ID)
        .set('Accept', 'application/json')
        .expect(401, done)
    })
  })
})
