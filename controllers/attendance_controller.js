const Attend = require('../models/attendance')
const Person = require('../models/person')

let getAttend = (req, res) => {
  Attend.find({}, (err, attend) => {
    if (err) return res.status(401).json({error: err})
    else res.status(200).json(attend)
  })
}

let newAttend = (req, res) => {
  if (!req.body.date) return res.status(401).json({error: 'Date must not be empty'})
  if (!req.body.people) return res.status(401).json({error: 'Must have name and attendance'})

  var makeAttend = new Attend()
  makeAttend.date = req.body.date

  var counter = req.body.people.length
  // retrieve id by person's name and save into DB; needs to be a dynamic loop
  for (let i = 0; i < req.body.people.length; i++) {
    Person.findOne({name: req.body.people[i].name}, (err, foundPerson) => {
      counter--
      if (err) return res.status(401).json({error: err})
      else {
        makeAttend.people.push({
          name: foundPerson.name,
          score: req.body.people[i].score,
          notes: req.body.people[i].notes,
          person: foundPerson._id
        })
      }
      if (counter === 0) {
        makeAttend.save((err, result) => {
          if (err) return res.status(422).json({error: err})
          else res.status(201).json(result)
        })
      }
    })
  }
}

module.exports = {
  newAttend: newAttend,
  getAttend: getAttend
}
