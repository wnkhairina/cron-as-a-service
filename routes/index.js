const express = require('express');
var router = express.Router();
const pingJob = require('./pingJob')

//get
router.get('/', function (req, res) {
    res.json({ message: 'welcome to our api!' });
});

//POST endpoint
router.route('/job')
    .post(pingJob);

// router.use('/job', pingJob)
module.exports = router

