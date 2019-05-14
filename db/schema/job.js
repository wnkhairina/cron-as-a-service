const mongoose = require('mongoose')
const Schema = mongoose.Schema

const JobSchema = new Schema({
  interval: String,
  endpoint: String,
  email: String
})

module.exports = mongoose.model('Job', JobSchema)
