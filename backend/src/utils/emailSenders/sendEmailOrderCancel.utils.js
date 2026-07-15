import { transporter } from "../../config/emailTransporter.confilg.js";
import { orderCancelTemp } from "../../emailTemplate/orderCancelTemp.js";






export const sendEmailOrderCancel = async (order,paymentData,orderCancelProducts,email, userName,transactionId) => {

try {
  const mailOptions = {
    from: `"shovexa.com" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: transactionId
      ? "Order Cancelled – Refund Initiated"
      : "Order Cancelled Successfully",
    html: orderCancelTemp(order,paymentData, orderCancelProducts, userName),
  };
  
  const info = await transporter.sendMail(mailOptions);
          return info;
} catch (error) {
  console.log('sendEmailOrderCancel error',error)
}
};