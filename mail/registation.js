const sendMail = require('./sendGridMailer');

const sendRegistationLetter = async (email, userName) => {
  const content = `
  <h1>Привет ${userName}</h1>
  <p>Спасибо за регистрацию</p>
  `;
  await sendMail(email, 'Регистрация на сайте React Shop', content.trim());
};

module.exports = sendRegistationLetter;
