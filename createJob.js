const Job = require('./schema/job');

const createJob = (req, res) => {
    var job = new Job();
    job.interval = req.body.interval;
    job.endpoint = req.body.endpoint;
    job.email = req.body.email;

    job.save(async function (err) {
        if (err)
            res.send(err);
        console.log('Added job to database!')

        res.json({ message: 'Job created!' });
    });
}

module.exports = createJob