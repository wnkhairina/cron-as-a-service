const WebHooks = require('node-webhooks')

const webHooks = new WebHooks({
  db: { 'addPost': ['https://enk7ran9o6an9.x.pipedream.net'] } // just an example
})

webHooks.add('notifyFailure', 'https://enk7ran9o6an9.x.pipedream.net')
  .then(function () {
    console.log('Done! From webhook')
  }).catch(function (err) {
    console.log(err)
  })

module.exports = webHooks
