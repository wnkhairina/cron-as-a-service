const express = require('express')
const controller = require('./controller')

const router = express.Router()

router.post('/jobs', controller.createCronJob)


module.exports = router