const sendLettr = require('./nodemailer');
const { BASEURL } = require('../config/config');

module.exports = async (email, token) => {
  const content = {
    subject: 'Восстановление пароля',
    html: `
    <a href="${BASEURL}/resetPassword/token=${token}">Восстановить пароль</a>
    `.trim(),
  };
  await sendLettr(email, content);
};
