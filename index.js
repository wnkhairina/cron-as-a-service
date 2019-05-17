require('dotenv').config()
// console.log(process.env)
const app = require('express')()
const bodyParser = require('body-parser')
const router = require('./routes')

// instantiate once
const agenda = require('./service/agenda')
require('./db/mongoose')

var port = process.env.PORT || 8082

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// NOT RIGHT TO DO IT HERE
app.use('*', (req, res, next) => {
  // assign agenda to request
  req.params.agenda = agenda
  // do whatever that needs to be done next
  next()
})

app.listen(port)
console.log('Server is running on port ' + port)


// routes
app.use('/api', router)
app.use('*', (req, res) => {
  res.send({ message: 'Hello World!' })
})

