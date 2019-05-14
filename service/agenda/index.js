const Agenda = require('agenda')

const uri = process.env.MONGODB_CONNECTION_STRING
console.log(uri)
const agenda = new Agenda({
  db: {
    address: uri,
    options: {
      useNewUrlParser: true
    }
  }
},
(err) => {
  console.log(err)
}
)

// IIFE
exports = (async () => {
  await agenda.start()
  console.log('started agenda')
  return agenda
})()
