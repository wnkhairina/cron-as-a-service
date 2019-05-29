const agenda = require('../../../service/agenda')

exports.findAllJobs = async () => {
  return new Promise((resolve, reject) => {
    try {
      const jobs = agenda.jobs({})
      resolve(jobs)
    } catch (error) {
      reject(error)
    }
  })
}
