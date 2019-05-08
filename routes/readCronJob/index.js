const express = require('express')
const controller = require('./controller')

const router = express.Router()

router.get('/read-cron-job',controller.readCronJob)


module.exports = router