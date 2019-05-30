const nodemailer = require('nodemailer')
require('dotenv').config()

// create email transporter
const sendEmail = (email, failedAt) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  let mailOptions = {
<<<<<<< HEAD:routes/job/helpers/sendEmail.js
    from: 'wannorkhairina@gmail.com',
=======
    from: 'cminlee9@gmail.com',
>>>>>>> kate-dev:service/agenda/jobs/sendEmail.js
    to: `${email}`,
    subject: 'Ping Failure',
    text: `Hi, this email is sent automatically to notify the ping failure.`

  }

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      return console.log(err.message)
    } else {
      console.log(`Email successfully sent to ${email}!`)
    }
  })
}

module.exports = sendEmail
