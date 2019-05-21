const agenda = require('../../../service/agenda')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

exports.findJob = async (id) => {
  return new Promise((resolve, reject) => {
    try {
      const jobs = agenda.jobs({ '_id': ObjectId(id) })
      resolve(jobs)
    } catch (error) {
      reject(error)
    }
  })
}
