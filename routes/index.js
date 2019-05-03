const express = require('express');
var router = express.Router();
const pingJob = require('./pingJob')


//middleware
// router.use(async function (req, res, next) {
//     console.log('Something is happening.');
//     createAgenda(req, res)
//     next();
// });


//get
router.get('/', function (req, res) {
    res.json({ message: 'welcome to our api!' });
});

 //create job at http://localhost:8082/api/job
router.route('/job')
    .post(pingJob);

// router.use('/job', pingJob)
module.exports = router

