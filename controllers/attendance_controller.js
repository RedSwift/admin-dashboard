const Attend = require('../models/attendance')
const Person = require('../models/person')

let getAttend = (req, res) => {
  Attend.find({}, (err, attend) => {
    if (err) return res.status(401).json({error: err})
    else res.status(200).json(attend)
  })
}

let showAttend = (req, res) => {
  Attend.findOne({_id: req.params.id}, (err, attend) => {
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

let updateAttend = function (req, res) {
  Attend.findOne({_id: req.params.id}, (err, attend) => {
    if (err) return res.status(401).json({error: err})
    if (!req.body.date) return res.status(401).json({error: 'Date cannot be blank!'})
    else {
      if (req.body.date) attend.date = req.body.date

      var counter = req.body.people.length
      for (let i = 0; i < req.body.people.length; i++) {
        counter--
        if (req.body.people[i].score) attend.people[i].score = req.body.people[i].score
        if (req.body.people[i].notes) attend.people[i].notes = req.body.people[i].notes
      }
      if (counter === 0) {
        attend.save((err, result) => {
          if (err) return res.status(401).json({error: err})
          else return res.status(201).json(result)
        })
      }
    }
  })
}

let getPersonAttend = function (req, res) {
  Attend.find({'people.person': req.params.id}, (err, personAttend) => {
    if (err) return res.status(401).json({error: err})
    else {
      // process the array of objects - return date, score, notes based on person and his id
      var personObj = []
      for (let i = 0; i < personAttend.length; i++) {
        for (let r = 0; r < personAttend[i].people.length; r++) {
          if (String(personAttend[i].people[r].person) === req.params.id) {
            personObj.push({
              date: personAttend[i].date,
              name: personAttend[i].people[r].name,
              score: personAttend[i].people[r].score,
              notes: personAttend[i].people[r].notes
            })
            break
          }
        }
      }
      res.status(200).json(personObj)
    }
  })
}

module.exports = {
  newAttend: newAttend,
  getAttend: getAttend,
  updateAttend: updateAttend,
  showAttend: showAttend,
  getPersonAttend: getPersonAttend
}
