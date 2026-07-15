import { transporter } from "../../config/emailTransporter.confilg.js";
import { orderPlacedSellerTemplate } from "../../emailTemplate/orderPlacedSeller.template.js";
import { ApiError } from "../apiError.js";


const EMAIL_USER = process.env.EMAIL_USER

export const sendEmailOrderPlacedSeller = async (order, orderedProduct, email) => {

    if (!EMAIL_USER) {
        throw new ApiError('owner email not found ')
    }
    const mailOptions = {
        from: `"Saadi Collection Alerts" ${EMAIL_USER}`,
        to: email,
        subject: "You have a new order",
        html: orderPlacedSellerTemplate(order, orderedProduct)
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