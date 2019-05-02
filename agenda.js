const Agenda = require('agenda');
const uri = `mongodb+srv://user:user@cluster0-vbtuu.mongodb.net/job?retryWrites=true`
const agenda = new Agenda({ db : { address: uri, options: { useNewUrlParser: true } }})

agenda.define('Ping website', (job, done) => {
    const {endpoint} = job.attrs.data;
    console.log(endpoint);
    
    console.log('Hello website!');
    console.log(new Date());
    
    done();
}); 

(async function(){
    console.log('Agenda starting...');
    await agenda.start();
    await agenda.every('5 seconds', 'Ping website', {endpoint: 'www.google.com/abc'});
})();

