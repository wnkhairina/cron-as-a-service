const nodemailer = require("nodemailer");

//create email transporter
const sendEmail = () => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: "wnkhairina@gmail.com",
            pass: "hagemaru123"
        }
    });

    let mailOptions = {
        from: "wnkhairina@gmail.com",
        to: "wan.nor.wan.rohaimi@accenture.com",
        subject: 'Not an update',
        text: 'Hi, this email is sent automatically'

    };

    transporter.sendMail(mailOptions, function (err, info) {

        if (err) {
            return console.log(err.message);
        }
        else {
            console.log("Email successfully sent!");
        }
    })

}

module.exports = sendEmail