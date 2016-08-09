const Person = require('../models/person.js')

let newPerson = function (req, res) {
  if (!req.body.name) return res.status(401).json({error: 'Name cannot be empty!'})
  Person.findOne({name: req.body.name}, function (err, person) {
    if (err) console.log(err)
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

let deletePerson = function (req, res) {
  Person.remove({_id: req.params.id}, function (err) {
    if (err) res.status(401).json({error: err})
    else res.status(201).json('Delete Successful!')
  })
}

module.exports = {
  newPerson: newPerson,
  deletePerson: deletePerson
}
