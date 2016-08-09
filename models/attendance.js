const mongoose = require('mongoose')
require('./person.js')

const attendSchema = new mongoose.Schema({
  date: String,
  people: [{
    name: String,
    score: String,
    notes: String,
    person: {type: mongoose.Schema.Types.objectId, ref: 'Person'}
  }]
})

let Attendance = mongoose.model('Attendance', attendSchema)
module.exports = Attendance
