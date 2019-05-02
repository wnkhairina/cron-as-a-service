// index.js

const express = require("express");
const nodemailer= require("nodemailer");

app = express();

//create email transporter
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
      subject: 'Error notice',
      text: 'Hi, this email is sent to notify that your job is failed.'

    };

    transporter.sendMail(mailOptions, function(err, info){
      
      if (err){
        return console.log(err.message);
      } 
      else {
        console.log("Email succesfully sent!");
      }
    })     
     
  

  