import { transporter } from "../../config/emailTransporter.confilg.js";
import { orderConfirmationTemp } from "../../emailTemplate/orderConfirnedTemp.js";
import { orderReadyForPickupTemp} from "../../emailTemplate/Orderreadyforpickup.template.js";
import { ApiError } from "../apiError.js";






export const OrderreadyforpickupSender= async (order) => {

    const mailOptions = {
  from: `"shovexa.com" ${process.env.EMAIL_USER}`,
  to:order.userId.email,
  subject: "Your Order Is Ready for Pickup",
  html:orderReadyForPickupTemp(order)
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