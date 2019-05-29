const ping = require('node-http-ping')
const webHooks = require('../../webhook')
const sendEmail = require('./sendEmail')

module.exports = async (agenda) => {
  agenda.define('Ping website', (job, done) => {
    const { to } = job.attrs.data
  
    // console.log(job.attrs.failedAt)
    console.log('1st job: ', new Date().getSeconds())
    ping(to, 80)
      .then(time => console.log(`Response time: ${time}ms`))
      .catch(() => {
        console.log(`Failed to ping ${to}`)
        // sendEmail(job.email, job.attrs.failedAt)
        webHooks.trigger('notifyFailure', { data: 'Request from webhook' })
      })
    done()
  })
}