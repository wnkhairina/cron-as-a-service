// index.js
const cron = require("node-cron");
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
    pass: ".."
  }
});

// sending emails at periodic intervals
cron.schedule("* * * * *", function() {
    console.log("---------------------");
    console.log("Running Cron Job");

    let mailOptions = {
      from: "wnkhairina@gmail.com",
      to: "wan.nor.wan.rohaimi@accenture.com",
      subject: 'Cron Ping Error',
      text: 'Hi, this email is sent automatically to notify your cron failure'

    };

    transporter.sendMail(mailOptions, function(err, info){
      
      if (err){
        return console.log(err.message);
      } 
      else {
        console.log("Email succesfully sent!");
      }
    })     
     
  });

  