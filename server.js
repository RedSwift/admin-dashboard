const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const browserSync = require('browser-sync')
const userCtrl = require('./controllers/user_controller')
const personCtrl = require('./controllers/person_controller')
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/bower_components'))

app.use(morgan('dev'))

app.listen(port, () => {
  browserSync({
    proxy: 'localhost:' + port,
    files: ['public/**/*.{js,css,html}'],
    open: false
  })
  console.log(`Listening on port: ${port}`)
})

// routes
app.get('/', (req, res) => {
  res.sendFile('index.html')
})

app.post('/signup', userCtrl.newUser)
app.post('/login', userCtrl.login)

app.post('/person/new', personCtrl.newPerson)
