require('dotenv').config()
const app = require('express')()
const bodyParser = require('body-parser')
const router = require('./routes')
const connectMongoDB = require('./db/connectMongoDB')
const agenda = require('./service/agenda')
// set up mongoDB connection
connectMongoDB()

var port = process.env.PORT || 8082

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

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
