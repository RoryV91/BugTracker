const nodemailer = require('nodemailer');

 //USE NODEMAILER WITH CREDENTIALS
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAJOR_ADMIN,
        pass: process.env.MAJOR_PASS
    }
});
module.exports = transport