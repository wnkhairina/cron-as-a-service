const ping = require('node-http-ping')
const webHooks = require('../../webhook')
const sendEmail = require('./sendEmail')

module.exports = async (agenda) => {
  agenda.define('Ping website', {lockLifetime: 1000}, (job, done) => {
    const { to } = job.attrs.data

    console.log('----------------')
        console.log('PING!')
        console.log(job.attrs.name)
        console.log('Job Id:', job.attrs._id)
        console.log('Endpoint:', job.attrs.data.to, new Date().getSeconds())

    ping(to, 80)
      .then(time => console.log(`Response time: ${time}ms`))
      .catch(() => {
        console.log(`FAILED TO PING ${to}`)
        // sendEmail(job.attrs.data.from, job.attrs.failedAt)
        webHooks.trigger('notifyFailure', { data: 'Request from webhook' })
      })
    done()
  })
}
