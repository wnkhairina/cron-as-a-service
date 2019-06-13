const agenda = require('../../../service/agenda')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId


exports.updateJobById = async (jobID, interval, endpoint, email, method, header, body) => {
  try {
    agenda.create('Ping website',
      {
        to: endpoint,
        from: email,
        method: method,
        header: header,
        body: body
      })
      .repeatEvery(`${interval} seconds`)
      .unique({ '_id': ObjectId(jobID) })
      .save()
    console.log('Updated')
  } catch (error) {
    throw error
  }
}
