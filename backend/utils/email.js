const nodemailer = require('nodemailer');

 //USE NODEMAILER WITH CREDENTIALS
const transport = nodemailer.createTransport({
    host: 'smtp.comcast.net',
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAJOR_ADMIN,
        pass: process.env.MAJOR_PASS
    }
});
module.exports = transport