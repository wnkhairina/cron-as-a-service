const uri = process.env.MONGODB_CONNECTION_STRING

const Agenda = require('agenda');

const connectionOpts = { db: { address: uri, options: { useNewUrlParser: true } } }

const agenda = new Agenda(connectionOpts)

const jobTypes = process.env.JOB_TYPES ? process.env.JOB_TYPES.split(',') : []

jobTypes.forEach(type => {
  require('./jobs/' + type)(agenda)
})

if (jobTypes.length) {
  agenda.start() // Returns a promise, which should be handled appropriately
}

module.exports = agenda
