import nodemailer from 'nodemailer';
import fa from 'zod/v4/locales/fa.cjs';

export const sendMail = async (subject,receiver,body) => {
    try {
        // Create a transporter object using SMTP
        const transporter = nodemailer.createTransport({
        host: process.env.NODEMAILER_HOST,
        port: process.env.NODEMAILER_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.NODEMAILER_EMAIL, // generated ethereal user
            pass: process.env.NODEMAILER_PASSWORD, // generated ethereal password
        },
        });
    
        // Define the email options
        const options = {
        from: `"Rachnika" <${process.env.NODEMAILER_EMAIL}>`, // sender address
        to: receiver, // list of receivers
        subject: subject, // Subject line
        html: body, // html body
        };
    
        // Send the email
         await transporter.sendMail(options);
        
        return {
            success: true,
            message: 'Email sent successfully',
        };

    } catch (error) {
        return {
            success: false,
            message: 'Failed to send email',
            error: error.message,
    }
}
    }