import { transporter } from "../../config/emailTransporter.confilg.js";
import { orderDelivered } from "../../emailTemplate/orderDeliveredTemp.js";





export const orderDeliveredEmailSender= async (email, order) => {

 try {
     const mailOptions = {
   from: `"Order Delivered" <${process.env.EMAIL_USER}>`,
   to: email,
   subject: "Your order has been delivered",
   html:orderDelivered(order)
 };
 
 const info = await transporter.sendMail(mailOptions);
         return info;
 } catch (error) {
  console.log('orderDeliveredEmailSender error',error)
 }
};