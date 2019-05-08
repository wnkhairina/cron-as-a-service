const express = require('express');
var router = express.Router();
const pingJob = require('./pingJob')
const readCronJob = require('./readCronJob')


//middleware
// router.use(async function (req, res, next) {
//     console.log('Something is happening.');
//     createAgenda(req, res)
//     next();
// });


//get
router.route('/job')
    .get(readCronJob);

 //create job at http://localhost:8082/api/job
router.route('/job')
    .post(pingJob);

// router.use('/job', pingJob)
module.exports = router

