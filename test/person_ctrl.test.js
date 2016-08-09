/* globals describe it */
const expect = require('chai').expect
const supertest = require('supertest')
require('../server')
const api = supertest(`http://localhost:3000`)

describe('GET, SHOW, POST, DELETE, PUT Person', () => {
  let id
  it('should GET all people')
  it('should allow POST for new person', function (done) {
    this.timeout(5000)
    api.post('/person/new')
    .set('Accept', 'application/json')
    .send({
      name: 'Tester'
    })
    .end((err, res) => {
      expect(err).to.be.null
      expect(res.status).to.eq(201)
      id = res.body._id
      expect(res.body.name).to.eq('Tester')
      done()
    })
  })
  it('should SHOW a person')
  it('should allow EDIT for a person')
  it('should allow DELETE for a person', (done) => {
    api.delete('/person/' + id)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(err).to.be.null
        expect(res.status).to.eq(201)
        expect(res.body).to.eq('Delete Successful!')
        done()
      })
  })
})
