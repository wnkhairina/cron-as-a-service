const createAgenda = require('./helpers/create-agenda')
// const  createJob  = require('./helpers/create-job')
const { findAllJobs } = require('./helpers/find-all-jobs')
const deleteCronJob = require('./helpers/delete-all-jobs')
const validateCreateJobBody = require('./validators/create-job')

exports.createCronJob = async (req, res) => {
  try {
    await validateCreateJobBody(req)
    const { interval, endpoint, email } = req.body
    const result = await createAgenda(interval, endpoint, email)

    res.send({ message: 'OK', result }) // response helper?
  } catch (err) {
    const { message, stack } = err
    res.status(500).send({ message, stack })
  }
}

exports.getAllCronJob = async (req, res) => {
  try {
    const result = await findAllJobs()
    res.send({ message: 'OK', result }) // response helper?
  } catch (err) {
    const { message, stack } = err
    res.status(500).send({ message, stack })
  }
}

exports.getCronJob = async (req, res) => {
  try {
    // const jobID = req.params.id
    // await findAllJobs(jobID)
    res.send({ message: 'NOT IMPLEMENTED' })
  } catch (err) {
    const { message, stack } = err
    res.status(500).send({ message, stack })
  }
}

exports.deleteCronJob = async (req, res) => {
  try {
    await deleteCronJob()
    res.send({ message: 'OK' })
  } catch (err) {
    const { message, stack } = err
    res.status(500).send({ message, stack })
  }
}
