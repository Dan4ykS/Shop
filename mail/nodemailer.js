const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
  {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'dan4yks.shop@gmail.com',
      pass: 'bzZ8888q',
    },
  },
  {
    from: 'Best shop on React <dan4yks.shop@gmail.com>',
  }
);

module.exports = async (email, content) => {
  await transporter.sendMail({
    to: email,
    ...content,
  });
};
