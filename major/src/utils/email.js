import nodemailer from 'nodemailer';

export const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "major.bugtracker@gmail.com",
        pass: "npwyyxfiseslzitu"
    }
});