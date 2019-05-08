const express = require('express');
var router = express.Router();
const createCronJob = require('./createCronJob')
const readCronJob = require('./readCronJob')

//get
router.route('/job')
    .get(readCronJob);

//POST endpoint (Create)
router.route('/job')
    .post(createCronJob);

//GET endpoint (Read)

//UPDATE endpoint (Update)

//DELETE endpoint (Delete)

// router.use('/job', pingJob)
module.exports = router

