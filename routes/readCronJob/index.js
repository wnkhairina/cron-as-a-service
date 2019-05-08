const express = require('express')
const controller = require('./controller')

const router = express.Router()

router.get('/job',controller.readJob)


module.exports = router