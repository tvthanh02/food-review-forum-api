require('dotenv').config();
const process = require('node:process');
const HOST_MAIL = process.env.HOST_MAIL;
const { CONFIRM_REGISTER_TEMPLATE_MAIL } = require('../../constants');
const sendMailWithTemplate = async (email) => {
  try {
    const response = await fetch(`${HOST_MAIL}/api/v1/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        receiveEmail: email,
        subject: 'Welcome to Food Review Forum',
        html: CONFIRM_REGISTER_TEMPLATE_MAIL,
      }),
    });
    return {
      data: await response.json(),
    };
  } catch (error) {
    return {
      data: null,
      message: error.message,
      error: 1,
    };
  }
};

module.exports = {
  sendMailWithTemplate,
};
