var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var Job = require('./models/job');
require ('dotenv').config();

const nodemailer= require("nodemailer");
const ping = require('node-http-ping')

var mongoose   = require('mongoose');
const uri = "mongodb+srv://user:user@cluster0-vbtuu.mongodb.net/job?retryWrites=true"

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
    ping(to, 80 /* optional */)
        .then(time => console.log(`Response time: ${time}ms`))
        .catch(() => console.log(`Failed to ping ${to}`))

    done();
}); 

mongoose.connect(uri, { useNewUrlParser: true}, err => {
    if(err) throw err
    console.log('Connected to MongoDB on cloud')
})


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8081;

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
            console.log(err);
            
            //create email transporter
            let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
                secure: false,
                requireTLS: true,
            auth: {
                user: "wnkhairina@gmail.com",
                pass: "hagemaru123"
            }
            });

                let mailOptions = {
                from: "wnkhairina@gmail.com",
                to: "wan.nor.wan.rohaimi@accenture.com",
                subject: 'Error notice',
                text: 'Hi, this email is sent to notify that your job is failed.'

                };

                transporter.sendMail(mailOptions, function(err, info){
                
                if (err){
                    return console.log(err.message);
                } 
                else {
                    console.log("Email succesfully sent!");
                }
                })     
        })
    });

app.use('/api', router);

app.listen(port);
console.log('Server is running on port ' + port);

