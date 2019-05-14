const Agenda = require('agenda')
const ping = require('node-http-ping')

const sendEmail = require('./sendEmail')

const uri = process.env.MONGODB_CONNECTION_STRING
const agenda = new Agenda({ db: { address: uri, options: { useNewUrlParser: true } } })

// Define agenda job
agenda.define('Ping website', (agendaJob, done) => {
  const { to } = agendaJob.attrs.data

  console.log(new Date())

  ping(to, 80)
    .then(time => console.log(`Response time: ${time}ms`))
    .catch(() => {
      console.log(`Failed to ping ${to}`)
      sendEmail(agendaJob.email, agendaJob.attrs.failedAt)
    })
  done()
})

const createAgenda = async (job) => {
  await agenda.start()
  await agenda.every(
    `${job.interval}`, 'Ping website',
    {
      to: job.endpoint,
      from: job.email
    }
  ).then((job) => {
    console.log('Agenda job Created')
  }).catch((err) => {
    console.log('Error!', err)
  })
}

module.exports = createAgenda
