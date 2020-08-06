const sendLettr = require('./nodemailer');
const { createRegistrationLetter } = require('./letters');

module.exports = async (email, userName, name, password) => {
  const content = {
    subject: 'Регистрация на сайте',
    html: createRegistrationLetter(name, userName, password),
  };
  await sendLettr(email, content);
};
