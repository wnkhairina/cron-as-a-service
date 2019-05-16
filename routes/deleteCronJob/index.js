const express = require('express')
const deleteCronJob = require('./deleteCronJob')

const router = express.Router()

router.delete('/delete-cron-job/:ObjectId', deleteCronJob)

module.exports = router