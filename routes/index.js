const express = require('express');
var router = express.Router();
const createCronJob = require('./createCronJob')

//get
router.get('/', function (req, res) {
    res.json({ message: 'welcome to our api!' });
});

//POST endpoint (Create)
router.route('/job')
    .post(createCronJob);

//GET endpoint (Read)

//UPDATE endpoint (Update)

//DELETE endpoint (Delete)

// router.use('/job', pingJob)
module.exports = router

