import { transporter } from "../../config/emailTransporter.confilg.js";
import { orderPickedByCourierTemp } from "../../emailTemplate/pickedbycourier.temp.js";
import { ApiError } from "../apiError.js";






export const sendEmailpickedbycourier = async (order) => {
    const mailOptions = {
  from: `"shovexa.com" ${process.env.EMAIL_USER}`,
  to:order.userId.email,
  subject: "Your Order Has Been Picked by Courier",
  html:orderPickedByCourierTemp(order)
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