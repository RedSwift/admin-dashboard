/* globals describe it */
const expect = require('chai').expect
const supertest = require('supertest')
require('../server')
const api = supertest(`http://localhost:3000`)
const Person = require('../models/person.js')

let peopleCount
Person.count({}, (err, count) => {
  if (err) console.log(err)
  else peopleCount = count
})

describe('GET, SHOW, POST, DELETE, PUT Person', () => {
  let id
  it('should GET all people', function (done) {
    this.timeout(5000)
    api.get('/people')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(err).to.be.null
        expect(res.status).to.eq(200)
        expect(res.body.length).to.eq(peopleCount)
        done()
      })
  })
  it('should allow POST for new person', (done) => {
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
