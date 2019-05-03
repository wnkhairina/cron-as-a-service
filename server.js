const express    = require('express');        // call express
const bodyParser = require('body-parser');
const nodemailer= require("nodemailer");
const ping = require('node-http-ping')
const mongoose   = require('mongoose');
require('dotenv').config();

const Job = require('./schema/job');
const sendEmail = require('./sendEmail')
var app = express();                 // define our app using express

const uri = process.env.MONGODB_CONNECTION

// Create agenda service
var Agenda = require('agenda')
var agenda = new Agenda({ db : { address: uri, options: { useNewUrlParser: true } }})

// Define agenda job
agenda.define('Ping website', (job, done) => {
    const {to} = job.attrs.data;
    // const {endpoint} = job.attrs.data;
    console.log(new Date())
    console.log(`Ping: ${to}`)
    
    // Using http by default
    ping(to, 80 )
        .then(time => console.log(`Response time: ${time}ms`))
        .catch(() => {
            console.log(`Failed to ping ${to}`),
            sendEmail()
        })

    done();
}); 

mongoose.connect(uri, { useNewUrlParser: true}, err => {
    if(err) throw err
    console.log('Connected to MongoDB on cloud')
})


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8082;

var router = express.Router(); 

//middleware
router.use(async function(req, res, next) {
    console.log('Something is happening.');
    await agenda.start()
    next(); 
});

//get
router.get('/', function(req, res) {
    res.json({ message: 'welcome to our api!' });   
});

router.route('/job')
    //create job at http://localhost:8080/api/job
    .post(async function(req, res) {
        console.log(req.body)
        var job = new Job();
        job.interval = req.body.interval;  
        job.endpoint = req.body.endpoint; 
        job.email = req.body.email;
        
        job.save(async function(err) {
            if (err)
                res.send(err);
                console.log('Added job to database!')

            res.json({ message: 'Job created!' });
        });

        await agenda.every(
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
    });

app.use('/api', router);

app.listen(port);
console.log('Server is running on port ' + port);

