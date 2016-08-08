const mongoose = require('mongoose')
require('./person.js')

const attendSchema = new mongoose.Schema({
  date: String,
  score: String,
  people: {type: mongoose.Schema.Types.objectId, ref: 'person'}
})

let Attendance = mongoose.model('Attendance', attendSchema)
module.exports = Attendance
