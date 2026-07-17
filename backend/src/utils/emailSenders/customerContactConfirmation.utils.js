import { transporter } from "../../config/emailTransporter.confilg.js";
import { customerContactConfirmationTemp } from "../../emailTemplate/customerContactConfirmationTemp.js";
import { ApiError } from "../apiError.js";




export const sendcustomerConfirmations = async (name,email) => {
const mailOptions = {
  from: `"Shovexa Support" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: `We got your message, ${name}`,
  html: customerContactConfirmationTemp(name)
};

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            
            if (error) {
                console.error("Failed to send email:", error);
                return reject(new ApiError(500, "Failed to send email"));
            }
            resolve(info);
        });
    });

};