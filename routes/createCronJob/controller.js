const createAgenda = require('./helpers/createAgenda')
const createJob = require('./helpers/createJob')
const sendEmail = require('./helpers/sendEmail')

exports.createCronJob = async (req, res) => {
    try {
        const job = await createJob(req, res)
        await createAgenda(job)
    } catch{
        const { message, stack } = error;
        res.status(500).send({ message, stack })
    }
    // console.log('logic needs to be changed')
}