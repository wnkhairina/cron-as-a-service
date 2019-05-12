const express = require('express');
var router = express.Router();
const createCronJob = require('./createCronJob')
const readCronJob = require('./readCronJob')

//POST endpoint (Create)
router.route('/jobs')
    .post(createCronJob);

//GET endpoint (Read)
router.route('/jobs')
    .get(readCronJob);

//UPDATE endpoint (Update)

//DELETE endpoint (Delete)

// router.use('/job', pingJob)
module.exports = router

