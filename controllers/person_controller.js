const Person = require('../models/person.js')

let newPerson = function (req, res) {
  if (!req.body.name) return res.status(401).json({message: 'Name cannot be empty!'})
  Person.findOne({name: req.body.name}, function (err, person) {
    if (err) console.log(err)
    if (person) return res.status(401).json('USERNAME NEEDS TO BE VALID')
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

module.exports = {
  newPerson: newPerson
}
