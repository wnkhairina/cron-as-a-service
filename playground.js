const Agenda = require('agenda')

const mongoConnectionString = 'mongodb://127.0.0.1/users';
 
const agenda = new Agenda({db: {address: mongoConnectionString, options: {useNewUrlParser: true}} });
 
// Or override the default collection name:
// const agenda = new Agenda({db: {address: mongoConnectionString, collection: 'jobCollectionName'}});
 
// or pass additional connection options:
// const agenda = new Agenda({db: {address: mongoConnectionString, collection: 'jobCollectionName', options: {ssl: true}}});
 
// or pass in an existing mongodb-native MongoClient instance
// const agenda = new Agenda({mongo: myMongoClient});
 
agenda.define('delete old users', (job, done) => {
  console.log('testing')
  console.log(new Date().getSeconds())
  // console.log(job)
  // console.log(job)
});
 
(async function() { // IIFE to give access to async/await
  await agenda.start();
  // await agenda.every('3 seconds', 'delete old users');
 
  // Alternatively, you could also do:
  // await agenda.every('*/3 * * * *', 'delete old users');

  await agenda.processEvery('6 seconds')
})()

async function graceful() {
  await agenda.stop();
  process.exit(0);
}
 
process.on('SIGTERM', graceful);
process.on('SIGINT' , graceful);