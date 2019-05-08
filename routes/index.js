const express = require('express');
var router = express.Router();
const createCronJob = require('./createCronJob')
const readCronJob = require('./readCronJob')

//POST endpoint (Create)
router.route('/create-cron-job')
    .post(createCronJob);

//GET endpoint (Read)
router.route('/read-cron-job')
    .get(readCronJob);

//UPDATE endpoint (Update)

//DELETE endpoint (Delete)

// router.use('/job', pingJob)
module.exports = router

