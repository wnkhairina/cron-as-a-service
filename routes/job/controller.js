const createAgenda = require('./helpers/createAgenda')
const createJob = require('./helpers/create-job')
const findAllJob = require('./helpers/find-all-jobs')

exports.createCronJob = async (req, res) => {
  try {
    const { interval, endpoint, email } = req.body
    const job = await createJob(interval, endpoint, email)
    const result = await createAgenda(job)

    res.send({ message: 'OK', result }) // response helper?
  } catch (err) {
    const { message, stack } = err
    res.status(500).send({ message, stack })
  }
}

exports.getAllCronJob = async (req, res) => {
  try {
    const result = await findAllJob()
    res.send({ message: 'OK', result }) // response helper?
  } catch (err) {
    const { message, stack } = err
    res.status(500).send({ message, stack })
  }
}

exports.getCronJob = async (req, res) => {
  try {
    res.send({ message: 'NOT IMPLEMENTED' })
  } catch (err) {
    const { message, stack } = err
    res.status(500).send({ message, stack })
  }
}
