const app    = require('express')();  
const bodyParser = require('body-parser');
const router = require('./routes')
const connectMongoDB = require('./db/connectMongoDB')

var port = process.env.PORT || 8082;

// only get called once, when server starts
const agenda = blablabla;
await agenda.start()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('*', async (req, res) => {
  // all requests go through here
  req.params.agenda = agenda
})
app.listen(port);
console.log('Server is running on port ' + port);

//set up mongoDB connection
connectMongoDB()

//routes
app.use('/api', router);

