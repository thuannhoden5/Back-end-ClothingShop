const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  service: 'gmail',
  port: 2525,
  auth: {
    user: 'shoppingclothes.mindx.xcarrer@gmail.com',
    pass: 'shoppingclothes',
  },
});

module.exports = { transport };
