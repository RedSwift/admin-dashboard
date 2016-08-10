const Attend = require('../models/attendance')
const Person = require('../models/person')

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
      if (err) console.log(err)
      else {
        // req.body.people[i].person = foundPerson._id
        // makeAttend.people.push(req.body.people[i])
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
//   var makeAttend = new Attend()
//
//   Person.findOne({name: req.body.people[1].name}, (err, foundPerson) => {
//     if (err) return res.status(401).json({error: 'Unable to find person in server'})
//     else {
//       console.log(foundPerson._id)
//       makeAttend.date = req.body.date
//       makeAttend.people = [{
//         name: req.body.people[1].name,
//         score: req.body.people[1].score,
//         person: foundPerson.id
//       }]
//     }
//     makeAttend.save((err, result) => {
//       if (err) return res.status(401).json({error: err})
//       else res.status(201).json(result)
//     })
//   })
// }

module.exports = {
  newAttend: newAttend
}
