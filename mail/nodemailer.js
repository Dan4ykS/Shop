const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
  {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'dan28012000@gmail.com',
      pass: 'Ut91nk2tdan',
    },
  },
  {
    from: 'Best shop on React <dan28012000@gmail.com>',
  }
);

module.exports = async (email, content) => {
  await transporter.sendMail({
    to: email,
    ...content,
  });
};
