
const Agenda = require('agenda')
const dotenv = require('dotenv').config()
const ping = require('node-http-ping')

const sendEmail = require('./sendEmail')

// const uri = process.env.MONGODB_CONNECTION_STRING

const agenda = new Agenda({mongo: myMongoClient})

// Define agenda job
agenda.define('Ping website', (agendaJob, done) => {
    const { to, id } = agendaJob.attrs.data;
    
    //debug
    const date = new Date()
    console.log(date.getSeconds())

    ping(to, 80)
    .then(time => { 
        console.log(`Response time: ${time}ms`)
        console.log(`ObjectID: ${id}`)
    })
    .catch(() => {
        console.log(`Failed to ping ${to}`)
        sendEmail(agendaJob.email, agendaJob.attrs.failedAt)
    })
    done();
});

const createAgenda = async (job) => {
    await agenda.start()
    await agenda.every(
        `${job.interval}`, 
        'Ping website',
        {
            id: job._id,
            to: job.endpoint,
            from: job.email
        }
    ).then((job) => {
        console.log('Agenda job Created')
    }).catch((err) => {
        console.log('Error!', err);
    })
}

module.exports = createAgenda