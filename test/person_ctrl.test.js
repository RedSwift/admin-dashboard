/* globals describe it */
const expect = require('chai').expect
const supertest = require('supertest')
require('../server')
const api = supertest(`http://localhost:3000`)

describe('GET, SHOW, POST, DELETE, PUT Person', () => {
  it('should GET all people')
  it('should SHOW a person')
  it('should allow POST for new person', function (done) {
    this.timeout(5000)
    api.post('/person/new')
      .set('Accept', 'application/json')
      .send({
        name: 'Dominic'
      })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res.status).to.eq(201)
        expect(res.body.name).to.eq('Dominic')
        done()
      })
  })
  it('should allow EDIT for a person')
  it('should allow DELETE for a person')
})
