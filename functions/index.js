const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require("cors")({ origin: true });

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

exports.sendEmail = functions.https.onRequest(async (request, response) => {

  return cors(request, response, async () => {
  if (request.method !== "POST") {
    response.send("Only valid POST alowed");
  }

    const { fname, lname, email, subject, message } = request.body;

    const text = `
    New message submitted by User.
    Name: ${fname} ${lname || " "}
    Subject: ${subject}
    Email: ${email}
    Message: ${message}
  `;

    const mailOptions = {
      from: `Contact Form <noreply@firebase.com>`,
      to: "vitc.comsoc@gmail.com",
      subject,
      text,
    };

  try {
    await (mailTransport.sendMail(mailOptions));
    response.send("Success");
  } catch (e) {
    response.send(`Error: ${e}`);
  }

  return null;
  })
});