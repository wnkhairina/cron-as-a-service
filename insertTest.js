
const mongoose = require('mongoose')
const uri = "mongodb+srv://user:user@cluster0-vbtuu.mongodb.net/test?retryWrites=true";

mongoose.connect(uri, { useNewUrlParser: true}, err => {
    if(err) throw err
    console.log('Connected to MongoDB on cloud')
})

// declare the schema .save()
var Schema       = mongoose.Schema;

var JobSchema = new Schema({
    interval: String,
    endpoint: String
});

// add an item using schema
var JobModel = mongoose.model('Job', JobSchema);

var job = new JobModel({ interval: 'every 5 minutes'});

job.save(function(err){
    if(err) throw err;
    console.log('Added')

});

