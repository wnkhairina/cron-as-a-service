const mongoose = require('mongoose')
require('dotenv').config()
const uri = process.env.MONGODB_CONNECTION_STRING

const unlockAgendaJobs = function (callback) {

    
    console.log('[Worker] Attempting to unlock locked Agenda jobs...');
    

    // Use connect method to connect to the server
    mongoose.connect(uri, { useNewUrlParser: true }, err => {
        if (err) throw err
        console.log('Connected to MongoDB on cloud')
    })

    // agenda.on('ready', function() {

    // Re-use Agenda's MongoDB connection
    // var agendaJobs = agenda._mdb.collection('agendaJobs');
    var agendaJobs = job.db().collection('agendaJobs');

    agendaJobs.update({
        lockedAt: {
            $exists: true
        },
        lastFinishedAt: {
            $exists: false
        }
    }, {
            $unset: {
                lockedAt: undefined,
                lastModifiedBy: undefined,
                lastRunAt: undefined
            },
            $set: {
                nextRunAt: new Date()
            }
        }, {
            multi: true
        }, function (err, numUnlocked) {
            if (err) {
                console.error(err);
            }
            if (process.env.NODE_ENV !== 'test') {
                console.log('[Worker] Unlocked %d Agenda jobs.', parseInt(numUnlocked, 10) || 0);
            }
            client.close(callback);
        });

}

module.exports = unlockAgendaJobs
