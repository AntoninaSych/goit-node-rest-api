const nodemailer = require('nodemailer');
require('dotenv').config();

const { UKR_USER, UKR_PASS } = process.env;

const nodemailerConfig = {
    host: 'smtp.ukr.net',
    port: 465,
    secure: true,
    auth: {
        user: UKR_USER,
        pass: UKR_PASS,
    },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
    const email = { ...data, from: UKR_USER };
    await transport.sendMail(email);
    return true;
};

module.exports = sendEmail;
