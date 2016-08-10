const Person = require('../models/person.js')

let getPeople = function (req, res) {
  Person.find({}, (err, people) => {
    if (err) return res.status(401).json({error: err})
    else res.status(200).json(people)
  })
}

let getPerson = function (req, res) {
  Person.findOne({_id: req.params.id}, (err, person) => {
    if (err) return res.status(401).json({error: err})
    else res.status(200).json(person)
  })
}

let newPerson = function (req, res) {
  if (!req.body.name) return res.status(401).json({error: 'Name cannot be empty!'})
  Person.findOne({name: req.body.name}, function (err, person) {
    if (err) return res.status(401).json({error: err})
    if (person) return res.status(401).json({error: 'Name already exists'})
    else {
      let makePerson = new Person()
      makePerson.name = req.body.name

      makePerson.save((err, result) => {
        if (err) return res.status(401).json({error: err})
        else res.status(201).json(result)
      })
    }
  })
}

let editPerson = function (req, res) {
  Person.findOne({_id: req.params.id}, (err, person) => {
    if (err) return res.status(401).json({error: err})
    else {
      if (!req.body.name) return res.status(401).json({error: 'Name cannot be empty!'})
      Person.findOne({name: req.body.name}, (err, found) => {
        if (err) return res.status(401).json({error: 'Name already exists'})
        else {
          person.name = req.body.name

          person.save((err, result) => {
            if (err) return res.status(401).json({error: err})
            else res.status(201).json(result)
          })
        }
      })
    }
  })
}

let deletePerson = function (req, res) {
  Person.remove({_id: req.params.id}, function (err) {
    if (err) res.status(401).json({error: err})
    else res.status(201).json('Delete Successful!')
  })
}

module.exports = {
  newPerson: newPerson,
  deletePerson: deletePerson,
  getPeople: getPeople,
  editPerson: editPerson,
  getPerson: getPerson
}
