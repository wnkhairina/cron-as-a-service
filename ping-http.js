const ping = require('node-http-ping')

const test = "google.com"

// Using http by default
ping(test, 80 /* optional */)
  .then(time => console.log(`Response time: ${time}ms`))
  .catch(() => console.log(`Failed to ping google.com`))
