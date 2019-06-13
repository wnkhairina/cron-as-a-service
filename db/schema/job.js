var mongoose = require('mongoose')
var Schema = mongoose.Schema

var JobSchema = new Schema({
  interval: String,
  endpoint: String,
  email: String,
  method: String,
  header: String,
  body: String
})

module.exports = mongoose.model('Job', JobSchema)
