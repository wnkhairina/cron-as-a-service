const createAgenda = require('./helpers/createAgenda')
const createJob = require('./helpers/createJob')
const sendEmail = require('./helpers/sendEmail')

exports.createCronJob = async (req, res) => {
    try {
        createJob(req, res, (job => {
            createAgenda(job, req.params.agenda)
        }))
    } catch{
        const { message, stack } = error;
        res.status(500).send({ message, stack })
    }
    // console.log('logic needs to be changed')
}