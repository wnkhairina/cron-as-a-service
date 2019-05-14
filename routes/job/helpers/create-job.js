const Job = require('../../../db/schema/job')

const createJob = async (interval, endpoint, email) => {
  return new Promise((resolve, reject) => {
    try {
      var job = new Job() // create an instance of job object
      job.interval = interval
      job.endpoint = endpoint
      job.email = email

      job.save()
        .then(job => {
          resolve(job)
        })
        .catch(err => {
          console.log('Error saving mongoose job!')
          throw err
        })
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = createJob
