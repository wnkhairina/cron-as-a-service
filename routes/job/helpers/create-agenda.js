const agenda = require('../../../service/agenda')

exports.createAgenda = async (interval, endpoint, email) => {

  await agenda.create('Ping website',
    {
      to: endpoint,
      from: email
    })
    .repeatEvery(`${interval} seconds`)
    .save()
    .then(() => {
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

