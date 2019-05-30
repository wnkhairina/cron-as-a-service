const agenda = require('../../../service/agenda')
const ObjectID = require('mongodb').ObjectID;

const deleteJob = async (jobId, req, res) => {

    console.log('job id ', jobId)

    return new Promise((resolve, reject) => {
        try {
            const jobs = agenda.cancel({_id:ObjectID(jobId)})
            resolve(jobs)
        } catch (error) {
            reject(error)
        }
    })

}
