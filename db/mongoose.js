const mongoose   = require('mongoose');
const dotenv = require('dotenv').config() //Read more or ask Kate tomorrow if don't understand
const uri = process.env.MONGODB_CONNECTION_STRING

mongoose.connect(uri, { useNewUrlParser: true }, err => {
    if(err) throw err
    console.log('Connected to MongoDB on cloud')
})

