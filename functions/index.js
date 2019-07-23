const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

exports.sendEmail = functions.https.onRequest(async (request, response) => {
  if (request.method !== 'POST') {
    response.send("Only valid POST alowed")
  }

  const gmailEmail = functions.config().gmail.email;
  const gmailPassword = functions.config().gmail.password;

  const mailTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailEmail,
      pass: gmailPassword,
    },
  });

  const { subject, text } = request.body;

  const mailOptions = {
    from: `Contact Form <noreply@firebase.com>`,
    to: 'sriru1998@gmail.com',
    subject,
    text,
  };
  
  try {
    await (mailTransport.sendMail(mailOptions));
  } catch(e) {
    response.status(500).send(`Error: ${e}`);
  }
  response.status(200).send("Success");
  return null;
});