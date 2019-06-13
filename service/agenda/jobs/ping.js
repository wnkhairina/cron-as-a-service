const ping = require('node-http-ping')
const webHooks = require('../../webhook')
const sendEmail = require('./sendEmail')
const request = require('request');
const rp = require('request-promise');

module.exports = async (agenda) => {
  agenda.define('Ping website', { lockLifetime: 1000 }, (job, done) => {

    console.log(job.attrs.data.to)
    console.log('BODY', typeof job.attrs.data.body, job.attrs.data.body)
    console.log('HEADERS', typeof job.attrs.data.header, job.attrs.data.header)
    
    var options = {
      method: job.attrs.data.method,
      uri: job.attrs.data.to,
      body: {
        body: job.attrs.data.body
      },
      headers: [
        {
          header: job.attrs.data.header
        }
      ]
    };
  
    rp(options.uri, function (error, response) {
    
      console.log('----------------')
      console.log('PING!')
      console.log(job.attrs.name)
      console.log('Job Id:', job.attrs._id)
      console.log('Endpoint:', job.attrs.data.to, new Date().getSeconds())

      ping(options.uri, 80)
      .then(time => console.log(`Response time: ${time}ms`))
      .catch(() => {
        console.log(`FAILED TO PING ${options.uri}`)
        // sendEmail(job.attrs.data.from, job.attrs.failedAt)
        webHooks.trigger('notifyFailure', { data: 'Request from webhook' })
      })

      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      
    })
      .then(function (parsedBody) {
        console.log('Succeed!')
      })
      .catch(function (err) {
        console.log('Failed!')
      })
    done()
  })
}
