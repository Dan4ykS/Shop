const sgMail = require('@sendgrid/mail');
const config = require('../config/config');

sgMail.setApiKey(config.SENDGRID_API_KEY);

module.exports = async (email, title, content) => {
  const leterConf = {
    to: email,
    from: 'Best Shop on React<NewShop@gmail.com>',
    subject: title,
    html: content,
  };
  try {
    await sgMail.send(leterConf);
  } catch (error) {
    throw error;
  }
};
