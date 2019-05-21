const createAgenda = require('./helpers/create-agenda')
const { findJob } = require('./helpers/find-job')
const { findAllJobs } = require('./helpers/find-all-jobs')
const { updateJobById } = require('./helpers/update-job')
const deleteCronJob = require('./helpers/delete-all-jobs')
const { deleteJobById } = require('./helpers/delete-job')

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

// 1. wrong properties of req.body [validation done]
// 2. missing properties [deny updates or replace old data only]
// 3. no job is found

exports.updateCronJobByID = async (req, res) => {
  const jobID = req.params.id
  const { interval, endpoint, email } = req.body
  const result = await findJob(jobID)

  const updates = Object.keys(req.body)
  const allowedUpdates = ['interval', 'endpoint', 'email']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }
  try {
    if (result.length === 0 || result === null) {
      console.log('result :', result)
      return res.status(404).send({ error: 'cron job not found!' })
    }

    await updateJobById(jobID, interval, endpoint, email)
    res.send({ message: 'OK' })
  } catch (err) {
    const { message, stack } = err
    res.status(500).send({ message, stack })
  }
}

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

exports.deleteCronJobByID = async (req, res) => {
  try {
    const message = await deleteJobById(req.params.id)
    res.send({ message })
  } catch (err) {
    const { message, stack } = err
    res.status(500).send({ message, stack })
  }
}
