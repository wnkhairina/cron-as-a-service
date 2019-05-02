const ping = require('node-http-ping')

const pingJob = () => {
// Using http by default
ping(to, 80 /* optional */)
.then(time => console.log(`Response time: ${time}ms`))
.catch(() => {
    console.log(`Failed to ping ${to}`),
    sendEmail()
})
}

module.exports = pingJob