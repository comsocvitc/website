const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});


const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

exports.sendEmail = functions.https.onRequest((request, response) => {
  if (request.method !== 'POST' && request.body.type !== 'mailer') {
    return null
  }

  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: 'vitc.comsoc@gmail.com',
  };

  // The user subscribed to the newsletter.
  mailOptions.subject = request.body.subject;
  mailOptions.text = request.body.text;
  
  await mailTransport.sendMail(mailOptions);
  console.log('New email sent');
  return null;
});