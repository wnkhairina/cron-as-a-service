const Agenda = require('agenda')

const uri = process.env.MONGODB_CONNECTION

const agenda = new Agenda({
  db: {
    address: uri,
    options: {
      useNewUrlParser: true
    }
  }
})

// IIFE
exports = (async () => {
  await agenda.start()
  return agenda
})()
