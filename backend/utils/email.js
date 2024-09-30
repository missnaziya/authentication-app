// utils/email.js

const nodemailer = require('nodemailer');

/**
 * Sends an OTP email to the specified recipient.
 * 
 * @param {string} email - The recipient's email address.
 * @param {string} otp - The OTP code to send.
 */
const sendOtpEmail = (email, otp) => {
    console.log("Preparing to send OTP to:", email);
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL, // Your Gmail address
            pass: process.env.EMAIL_PASSWORD, // Your Gmail password or app-specific password
        },
    });

    const mailOptions = {
        from: process.env.EMAIL, // Sender address
        to: email, // Recipient's email address
        subject: 'Your OTP Code', // Email subject
        text: `Your OTP code is: ${otp}`, // Email body
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return; // You might want to handle the error further here
        }
        console.log('Email sent successfully:', info.response);
    });
};

module.exports = { sendOtpEmail };
