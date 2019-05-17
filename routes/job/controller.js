const  createAgenda  = require('./helpers/create-agenda')
// const  createJob  = require('./helpers/create-job')
const { findJob } = require('./helpers/find-job')
const { findAllJobs } = require('./helpers/find-all-jobs')
const deleteCronJob = require('./helpers/delete-all-jobs')

// Create
exports.createCronJob = async (req, res) => {
  try {
    const { interval, endpoint, email } = req.body
    const result = await createAgenda(interval, endpoint, email)

    res.send({ message: 'OK', result }) // response helper?
  } catch (err) {
    const { message, stack } = err
    res.status(500).send({ message, stack })
  }
}

// Read
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
    const jobID = req.params.id
    const result = await findJob(jobID)
    res.send({ message: 'OK', result })
  } catch (err) {
    const { message, stack } = err
    res.status(500).send({ message, stack })
  }
}

// Update


// Delete
exports.deleteCronJob = async (req, res) => {
  try {
    await deleteCronJob()
    res.send({ message: 'OK' })
  } catch (err) {
    const { message, stack } = err
    res.status(500).send({ message, stack })
  }
}

