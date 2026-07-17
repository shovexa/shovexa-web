import { transporter } from "../../config/emailTransporter.confilg.js";
import { customerContactConfirmationTemp } from "../../emailTemplate/customerContactConfirmationTemp.js";
import { customerContactTemp } from "../../emailTemplate/customerContactTemplate.js";
import { ApiError } from "../apiError.js";







export const sendEmailToSupportTeam = async (name,email,message) => {

const mailOptions = {
  from: `"Customer Support" <${process.env.EMAIL_USER}>`,
  replyTo: email,
  to: process.env.SUPORT_TEAM_EMAIL,
  subject: `New message from ${name}`,
  html: customerContactTemp(name, email, message)
};
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            
            if (error) {
                console.error("Failed to send email:", error);
                return reject(new ApiError(500,error|| "Failed to send email"));
            }
            resolve(info);
        });
    });

};