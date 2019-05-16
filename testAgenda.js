const Agenda = require('agenda');
const { MongoClient } = require('mongodb');

async function run() {
    const uri = 'mongodb://127.0.0.1/agenda';

    MongoClient.connect(uri, { useNewUrlParser: true }, err => {
        if (err) throw err
        console.log('Connected to MongoDB on cloud')
    })

    const agenda = new Agenda({db: {address: uri}});

    agenda.define('hello', () => {
        console.log('Hello, World!');
        process.exit(0);
    });

    await new Promise(resolve => agenda.once('ready'.resolve));

    agenda.schedule(new Date(Date.now() + 1000), 'hello');
    agenda.start();

}

run().catch(error => {
    console.error(error);
    process.exit(-1);
});