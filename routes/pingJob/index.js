const express = require('express')
const controller = require('./controller')

const router = express.Router()

router.post('/job', controller.createPing)

module.exports = router