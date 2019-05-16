const app = require('express')();
const dotenv = require('dotenv').config() //Read more or ask Kate tomorrow if don't understand
const Agenda = require('agenda')
const uri = process.env.MONGODB_CONNECTION

var port = process.env.PORT || 8083;

app.listen(port);
console.log('Server is running on port ' + port);

const agenda = new Agenda({ db: { address: uri, options: { useNewUrlParser: true } } });

// agenda.define('hello world', (job, done) => {
//     console.log('Hello World');
//     done();
// })

// agenda.on('ready', function(){
//     agenda.every('5 seconds', ['hello world', 'hello']);
//     agenda.start();
// })

// agenda.define('hello', (job, done) => {
//     console.log('Hello');
//     done();
// })

// agenda.processEvery('1 seconds');

const every = (interval, name, data, options) => {
    return new Promise((resolve, reject) => {
        agenda.create(name, data)
            .schedule(interval)
            .repeatAt(interval, options)
            
    });
};

agenda.define('userJob', (job, done) => {
    console.log('Hello user ' + job.attrs.data.userId);
    done();
});

const job1 = every('1 minute', 'userJob', { userId: 1 });
const job2 = every('5 minutes', 'userJob', { userId: 2 });

// don't forget save is async
Promise.all([job1, job2])
    .then(() => console.log('scheduled jobs'))
    .catch((err) => console.error(err));