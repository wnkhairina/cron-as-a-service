const express = require('express')
const router = express.Router()
const jobRouter = require('./job')

router.use('/job', jobRouter)
module.exports = router

