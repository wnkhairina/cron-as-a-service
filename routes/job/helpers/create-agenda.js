const agenda = require('../../../service/agenda')

const createAgenda = async (interval, endpoint, email) => {
  // await agenda.start()
  await agenda.every(
    '10 seconds', 'Ping website 2'
  )

  await agenda.create('Ping website',
    {
      to: endpoint,
      from: email
    })
    .repeatEvery(`${interval}`)
    .save()
    .then((job) => {
      console.log('Agenda job created!')
    }).catch((err) => {
      console.log('Error!', err)
    })
}
// async function graceful() {
//   await agenda.stop()
//   process.exit(0)
// }

// process.on('SIGTERM', graceful);
// process.on('SIGINT', graceful);

module.exports = createAgenda
