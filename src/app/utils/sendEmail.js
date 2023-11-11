const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            service: process.env.EMAIL_SERVICE,
            port: process.env.EMAIL_PORT,
            secure: true,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent successfully");
    } catch (err) {
        console.log(err, "email not sent");
    }
}

module.exports = sendEmail;