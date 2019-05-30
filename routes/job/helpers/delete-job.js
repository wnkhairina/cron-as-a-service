const agenda = require('../../../service/agenda')
const ObjectID = require('mongodb').ObjectID;

exports.deleteJobById = async (jobId, req, res) => {

    return new Promise((resolve, reject) => {
        try {
            agenda.cancel({_id:ObjectID(jobId)})
            resolve('Deleted!')
        } catch (error) {
            reject(error)
        }
    })
}
