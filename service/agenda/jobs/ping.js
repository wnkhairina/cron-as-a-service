const ping = require('node-http-ping')
const sendEmail = require('../../../routes/job/helpers/sendEmail')

module.exports = async (agenda) => {
  agenda.define('Ping website', (job, done) => {
    const { to } = job.attrs.data

    console.log('----------------------------')
    console.log(job.attrs.name)
    console.log('Job Id:', job.attrs._id)
    console.log('Ping:', job.attrs.data.to, new Date().getSeconds())

    ping(to, 80)
      .then(time => console.log(`Response time: ${time}ms`))
      .catch(() => {
        console.log(`Failed to ping ${to}`)
        sendEmail(job.email, job.attrs.failedAt)
      })
    done()
  })
}