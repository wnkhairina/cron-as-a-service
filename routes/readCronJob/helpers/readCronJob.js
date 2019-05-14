const Job = require('../../../db/schema/job');

const readCronJob = (req, res, job) => {
    Job.find()
        .then(job => {
            res.send(job);
            console.log('Job retrieved')
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving notes."
            });
        });
};

module.exports = readCronJob