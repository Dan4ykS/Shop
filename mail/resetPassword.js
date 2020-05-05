const sendLettr = require('./nodemailer');

module.exports = async (email, token) => {
  const content = {
    subject: 'Восстановление пароля',
    html: `
    <a href="http://localhost:3000/resetPassword/token=${token}">Восстановить пароль</a>
    `.trim(),
  };
  await sendLettr(email, content);
};
