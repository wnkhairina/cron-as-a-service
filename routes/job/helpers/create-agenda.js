const agenda = require('../../../service/agenda')

const createAgenda = async (job) => {

  await agenda.create('Ping website',
    {
      to: job.endpoint,
      from: job.email
    }
  )
    .repeatEvery(`${job.interval}`)
    .save()
    .then((job) => {
      console.log('Agenda job created!')
    }).catch((err) => {
      console.log('Error!', err)
    })
}

async function graceful() {
  await agenda.stop();
  process.exit(0);
}

process.on('SIGTERM', graceful);
process.on('SIGINT', graceful);

module.exports = createAgenda
