const agenda = require('../../../service/agenda')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

exports.deleteJobById = async (id) => {
  return new Promise((resolve, reject) => {
    try {
      agenda.cancel({ '_id': ObjectId(id) })
      resolve('Deleted!')
    } catch (error) {
      reject(error)
    }
  })
}
