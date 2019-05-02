const express = require('express');
const createJob = require('../createJob')
const pingJob = require('../agenda')
var router = express.Router();

//middleware
// router.use(async function (req, res, next) {
//     console.log('Something is happening.');
//     await agenda.start()
//     next();
// });

//get
router.get('/', function (req, res) {
    res.json({ message: 'welcome to our api!' });
});

 //create job at http://localhost:8082/api/job
router.route('/job')
    .post(async function (req, res) {
        console.log('route is working')
        createJob(req, res)
        pingJob(req, res)

        // await agenda.every(
        //     `${job.interval} seconds`,
        //     'Ping website',
        //     {
        //         to: job.endpoint,
        //         from: job.email
        //     }
        // ).then((job) => {
        //     console.log('Agenda Job Created')
        // }).catch((err) => {
        //     console.log(err),
        //         sendEmail()

        // })
    });

module.exports = router

