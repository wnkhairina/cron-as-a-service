
const Agenda = require('agenda')
const dotenv = require('dotenv').config() //Read more or ask Kate tomorrow if don't understand
const uri = process.env.MONGODB_CONNECTION
const ping = require('./ping')

const agenda = new Agenda({ db : { address: uri, options: { useNewUrlParser: true } }})

const createAgenda = (req, res) => {
agenda.every(
    `${job.interval} seconds`, 
    'Ping website', 
    { 
        to: job.endpoint, 
        from: job.email 
    }
).then((job) => {
    console.log('Agenda Job Created')
}).catch((err) => {
    console.log(err),
    sendEmail()
    
})

// Define agenda job
agenda.define('Ping website', (job, done) => {
    const {to} = job.attrs.data;
    // const {endpoint} = job.attrs.data;
    console.log(new Date())
    console.log(`Ping: ${to}`)
    
    ping()

    done();
}); 
}

module.exports = createAgenda