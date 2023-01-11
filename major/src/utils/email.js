import nodemailer from 'nodemailer';

const SENDER = process.env.MAJOR_ADMIN
const PASS = process.env.MAJOR_PASS
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: SENDER,
        pass: PASS
    }
});

export default transport 