module.exports = async (agenda) => {
  agenda.define('Ping website 2', async (job, done) => {

    console.log('----------------------------')
    console.log(job.attrs._id)
    console.log('2nd job: ', new Date().getSeconds())
    done()
  })
}