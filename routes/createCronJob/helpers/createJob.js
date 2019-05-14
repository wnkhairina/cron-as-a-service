//Create a job instance
const Job = require('../../../schema/job');

const createJob = async(req, res) => {
    var job = new Job(); //create an instance of job object
    job.interval = req.body.interval;
    job.endpoint = req.body.endpoint;
    job.email = req.body.email;

    job.save(async function (err) {
        if (err)
            res.send(err);
        console.log('Added job to database!')

        res.json({ message: 'Job created!' });
    });

    return job
}

module.exports = createJob

//Not needed