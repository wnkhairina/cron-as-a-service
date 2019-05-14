const express = require('express')
const updateCronJob = require('./updateCronJob')

const router = express.Router()

router.post('/update-cron-job', updateCronJob)


module.exports = router