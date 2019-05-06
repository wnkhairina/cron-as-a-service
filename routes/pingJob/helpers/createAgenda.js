
const Agenda = require('agenda')
const dotenv = require('dotenv').config() //Read more or ask Kate tomorrow if don't understand
const ping = require('node-http-ping')
const sendEmail = require('./sendEmail')

const uri = process.env.MONGODB_CONNECTION

const agenda = new Agenda({ db: { address: uri, options: { useNewUrlParser: true } } })

const createAgenda = async (job) => {
    // Define agenda job

    await agenda.start()
    agenda.define('Ping website', (agendaJob, done) => {
        const { to } = agendaJob.attrs.data;

        console.log(new Date())
        console.log(`Ping: ${to}`)
        console.log(`Failed to ping at ${agendaJob.attrs.failedAt}`)

        ping(to, 80)
            .then(time => console.log(`Response time: ${time}ms`))
            .catch(() => {
                console.log(`Failed to ping ${to}`)
                sendEmail(job.email, agendaJob.attrs.failedAt)
            })
        done();
    });

    await agenda.every(
        `${job.interval}`, 'Ping website',
        {
            to: job.endpoint,
            from: job.email
        }
    ).then((job) => {
        console.log('Agenda job Created')
    }).catch((err) => {
        console.log(err);
        sendEmail(job.email)
    })
}

module.exports = createAgenda