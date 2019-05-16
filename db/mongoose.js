const mongoose = require('mongoose')
require('dotenv').config()
const uri = process.env.MONGODB_CONNECTION_STRING

mongoose.connect(uri, { useNewUrlParser: true }, err => {
  if (err) throw err
  console.log('Connected to MongoDB on cloud')
})

module.exports = mongoose
