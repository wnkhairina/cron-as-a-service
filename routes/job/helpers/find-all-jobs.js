const Job = require('../../../schema/job')

exports.findAllJobs = async () => {
  return new Promise((resolve, reject) => {
    try {
      Job.find()
        .then(jobs => {
          console.log('Job retrieved')
          resolve(jobs)
        }).catch(err => {
          throw err
        })
    } catch (error) {
      reject(error)
    }
  })
}
