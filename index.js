const app    = require('express')();  
const bodyParser = require('body-parser');
const router = require('./routes')
const connectMongoDB = require('./db/connectMongoDB')

var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(port);
console.log('Server is running on port ' + port);

//set up mongoDB connection
connectMongoDB()

//routes
app.use('/api', router);

