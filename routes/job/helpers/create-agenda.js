const agenda = require('../../../service/agenda')

exports.createAgenda = async (interval, endpoint, email, method, header, body) => {

  await agenda.create('Ping website',
    {
      to: endpoint,
      from: email,
      method: method,
      header: header,
      body: body
    })
    .repeatEvery(`${interval} seconds`)
    .save()
    .then(() => {
      console.log('Agenda job created!')
    }).catch((err) => {
      console.log('Error!', err)
    })
}
