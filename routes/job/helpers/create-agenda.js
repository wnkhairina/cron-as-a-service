// const Agenda = require('agenda')

// const ping = require('node-http-ping')

// const uri = process.env.MONGODB_CONNECTION_STRING
// const agenda = new Agenda({ db: { address: uri, options: { useNewUrlParser: true } } })

// Define agenda job
// agenda.define('Ping website', (agendaJob, done) => {
//   const { to } = agendaJob.attrs.data

//   console.log(new Date())

//   ping(to, 80)
//     .then(time => console.log(`Response time: ${time}ms`))
//     .catch(() => {
//       console.log(`Failed to ping ${to}`)
//       sendEmail(agendaJob.email, agendaJob.attrs.failedAt)
//     })
//   done()
// })

const agenda = require('../../../service/agenda')

const createAgenda = async (job) => {
  // await agenda.start()
  // await agenda.every(
  //   '5 seconds', 'Ping website 2'
  // )
  // await agenda.every(
  //   `${job.interval}`, 'Ping website',
  //   {
  //     to: job.endpoint,
  //     from: job.email
  //   }
  // ).then((job) => {
  //     console.log('Agenda job Created')
  //   }).catch((err) => {
  //     console.log('Error!', err)
  //   })

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
    // console.log(job.attrs._id)
    // console.log('3rd job: ', new Date().getSeconds())
  })

  // job.repeatEvery("10 seconds");
  // job.save(); 
}


async function graceful() {
  await agenda.stop();
  process.exit(0);
}

process.on('SIGTERM', graceful);
process.on('SIGINT', graceful);

module.exports = createAgenda
