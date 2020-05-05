const sendLettr = require('./nodemailer');

module.exports = async (email, userName) => {
  const content = {
    subject: 'Регистрация на сайте',
    text: `${userName}, спасибо за регистрацию !`,
  };
  await sendLettr(email, content);
};
