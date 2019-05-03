
const Agenda = require('agenda')
const dotenv = require('dotenv').config() //Read more or ask Kate tomorrow if don't understand
const ping = require('node-http-ping')

const uri = process.env.MONGODB_CONNECTION

const agenda = new Agenda({ db: { address: uri, options: { useNewUrlParser: true } } })

const createAgenda = async (job) => {
    // Define agenda job
    agenda.define('Ping website', (agendaJob, done) => {
        const { to } = agendaJob.attrs.data;
        // const {endpoint} = job.attrs.data;
        console.log(new Date())
        console.log(`Ping: ${to}`)

        ping(to, 80)
            .then(time => console.log(`Response time: ${time}ms`))
            .catch(() => {
                console.log(`Failed to ping ${to}`)
            })

        done();
    });
    await agenda.every(
        `${job.interval} seconds`,
        'Ping website',
        {
            to: job.endpoint,
            from: job.email
        }
    ).then((job) => {
        console.log('Agenda job Created')
    }).catch((err) => {
        console.log(err),
            sendEmail()
    })
}

module.exports = createAgenda