const agenda = require('../../../service/agenda')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

// 1. wrong properties of req.body
// 2. missing properties
// 3. no job is found

exports.updateJobById = async (id, interval, endpoint, email) => {
  try {
    agenda.create('Ping website',
      {
        to: endpoint,
        from: email
      })
      .repeatEvery(interval)
      .unique({ '_id': ObjectId(id) })
      .save()
    console.log('Updated')
  } catch (error) {
    throw error
  }
}

// agenda.jobs({name: 'job name'}, (error, jobs) => {
//   const job = jobs[0];
//   job.attrs.data.someProperty = 'new value';
//   job.save();
// })