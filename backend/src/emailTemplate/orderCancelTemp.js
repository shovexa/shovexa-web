export const orderCancelTemp = (order,paymentData, orderedProducts, userName) => {
    const websiteUrl = process.env.WEBSITE_URL;

    const productList = orderedProducts
  .map((item, index) => {
    const matchedProduct = order.products.find((p) => {
      const id =
        typeof p.productId === "object"
          ? p.productId._id.toString()
          : p.productId.toString();

      return id === item._id.toString();
    });

    const quantity = matchedProduct?.quantity || 0;
    const subtotal = item.price * quantity;

 return `
<tr>

<td class="col-num" style="padding:16px;border-bottom:1px solid #ececec;text-align:center;font-weight:600;color:#666;">
${index + 1}
</td>

<td class="col-product" style="padding:16px;border-bottom:1px solid #ececec;">
<table cellpadding="0" cellspacing="0" border="0">
<tr>

<td style="padding-right:12px;vertical-align:top;">
<img
class="product-img"
src="${item.image}"
alt="${item.title}"
style="
width:70px;
height:70px;
border-radius:12px;
object-fit:cover;
display:block;
border:1px solid #e5e7eb;
">
</td>

<td style="vertical-align:top;">
<div style="
font-size:15px;
font-weight:600;
color:#1f2937;
line-height:22px;
margin-bottom:6px;
word-break:break-word;
">
${item.title}
</div>

<div style="
display:inline-block;
padding:4px 10px;
border-radius:20px;
background:#fff7ed;
color:#ea580c;
font-size:12px;
font-weight:600;
">
Cancelled Item
</div>
</td>

</tr>
</table>
</td>

<td class="col-price" style="
padding:16px;
border-bottom:1px solid #ececec;
text-align:center;
font-weight:600;
color:#374151;
white-space:nowrap;
">
PKR ${item.price.toFixed(2)}
</td>

<td class="col-qty" style="
padding:16px;
border-bottom:1px solid #ececec;
text-align:center;
font-weight:600;
color:#374151;
">
${quantity}
</td>

<td class="col-subtotal" style="
padding:16px;
border-bottom:1px solid #ececec;
text-align:center;
font-weight:700;
color:#dc2626;
white-space:nowrap;
">
PKR ${subtotal.toFixed(2)}
</td>

</tr>
`;
  })
  .join("");

const refundNote = order.transactionId
  ?`
<div style="
background:#f8fafc;
border:1px solid #dbeafe;
border-radius:16px;
padding:28px;
margin-top:30px;
">

<div style="display:flex;align-items:center;margin-bottom:18px;">
<div style="
width:48px;
height:48px;
background:#dbeafe;
border-radius:12px;
text-align:center;
line-height:48px;
font-size:24px;
margin-right:14px;
flex-shrink:0;
">
💳
</div>

<div>
<h2 style="
margin:0;
font-size:22px;
color:#1d4ed8;
">
Refund Information
</h2>

<p style="
margin:6px 0 0;
color:#64748b;
font-size:14px;
">
Your cancellation request has been approved.
</p>
</div>
</div>

<p style="
margin:0 0 22px;
font-size:15px;
line-height:1.7;
color:#475569;
">
Since this order was paid online, our finance team will verify your payment and process the refund using the account details below.
</p>

<table
class="pay-table"
width="100%"
cellpadding="0"
cellspacing="0"
style="
border-collapse:separate;
border-spacing:0 10px;
"
>

<tr>
<td class="pay-label" style="
width:40%;
font-weight:600;
color:#334155;
padding:14px 16px;
background:#ffffff;
border:1px solid #e2e8f0;
border-radius:10px 0 0 10px;
">
Payment Platform
</td>

<td class="pay-value" style="
padding:14px 16px;
background:#ffffff;
border:1px solid #e2e8f0;
border-left:none;
border-radius:0 10px 10px 0;
font-weight:600;
color:#111827;
word-break:break-word;
">
${paymentData.paymentPlatform}
</td>
</tr>

<tr>
<td class="pay-label" style="
font-weight:600;
color:#334155;
padding:14px 16px;
background:#ffffff;
border:1px solid #e2e8f0;
border-radius:10px 0 0 10px;
">
Account Holder
</td>

<td class="pay-value" style="
padding:14px 16px;
background:#ffffff;
border:1px solid #e2e8f0;
border-left:none;
border-radius:0 10px 10px 0;
font-weight:600;
color:#111827;
word-break:break-word;
">
${paymentData.accountUsername}
</td>
</tr>

<tr>
<td class="pay-label" style="
font-weight:600;
color:#334155;
padding:14px 16px;
background:#ffffff;
border:1px solid #e2e8f0;
border-radius:10px 0 0 10px;
">
Account Number
</td>

<td class="pay-value" style="
padding:14px 16px;
background:#ffffff;
border:1px solid #e2e8f0;
border-left:none;
border-radius:0 10px 10px 0;
font-weight:600;
color:#111827;
word-break:break-word;
">
${paymentData.accountNumber}
</td>
</tr>

</table>

<div style="
margin-top:22px;
padding:16px 18px;
background:#ecfdf5;
border-left:4px solid #22c55e;
border-radius:10px;
">

<p style="
margin:0;
font-size:14px;
line-height:1.8;
color:#166534;
">
<strong>Estimated Processing Time</strong><br>
Refunds are generally completed within <strong>3 to 7 business days</strong> after payment verification. You will receive another email once your refund has been successfully processed.
</p>

</div>

</div>
`
  :`
<div style="
background:#fffbeb;
border:1px solid #fde68a;
border-radius:16px;
padding:28px;
margin-top:30px;
">

<div style="display:flex;align-items:center;margin-bottom:18px;">
<div style="
width:48px;
height:48px;
background:#fef3c7;
border-radius:12px;
text-align:center;
line-height:48px;
font-size:24px;
margin-right:14px;
flex-shrink:0;
">
ℹ️
</div>

<div>
<h2 style="
margin:0;
font-size:22px;
color:#d97706;
">
No Refund Required
</h2>

<p style="
margin:6px 0 0;
font-size:14px;
color:#92400e;
">
This cancellation does not require a refund.
</p>
</div>
</div>

<p style="
margin:0;
font-size:15px;
line-height:1.8;
color:#57534e;
">
This order was not paid online, so there is no payment to return. Your cancellation has been completed successfully, and no further action is required from your side.
</p>

<div style="
margin-top:22px;
padding:16px 18px;
background:#ffffff;
border-left:4px solid #f59e0b;
border-radius:10px;
">

<p style="
margin:0;
font-size:14px;
line-height:1.8;
color:#78350f;
">
<strong>Payment Status</strong><br>
No online payment was received for this order. Therefore, a refund will not be issued.
</p>

</div>

</div>
`;


    return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="format-detection" content="telephone=no,date=no,address=no,email=no,url=no">
      <title>Order Cancelled</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
              -webkit-text-size-adjust: 100%;
              text-size-adjust: 100%;
          }
          table {
              border-collapse: collapse;
          }
          img {
              max-width: 100%;
          }

          /* ===== Responsive overrides ===== */
          @media only screen and (max-width: 600px) {
              .email-body {
                  padding: 16px 8px !important;
              }
              .email-wrapper {
                  width: 100% !important;
                  max-width: 100% !important;
              }
              .header-section {
                  padding: 24px 16px !important;
              }
              .header-title {
                  font-size: 24px !important;
                  margin: 16px 0 8px !important;
              }
              .header-sub {
                  font-size: 14px !important;
              }
              .content-section {
                  padding: 20px !important;
              }
              .order-card {
                  padding: 16px !important;
              }
              .section-heading {
                  font-size: 18px !important;
              }
              .table-scroll {
                  overflow-x: auto !important;
                  -webkit-overflow-scrolling: touch !important;
                  width: 100% !important;
              }
              .items-table {
                  min-width: 480px !important;
              }
              .col-num,
              .col-price,
              .col-qty,
              .col-subtotal {
                  padding: 10px 8px !important;
                  font-size: 13px !important;
              }
              .col-product {
                  padding: 10px 8px !important;
              }
              .product-img {
                  width: 52px !important;
                  height: 52px !important;
              }
              .refund-box {
                  padding: 18px !important;
              }
              .pay-table td {
                  display: block !important;
                  width: 100% !important;
                  box-sizing: border-box !important;
                  border-radius: 8px !important;
                  border: 1px solid #e2e8f0 !important;
              }
              .pay-label {
                  border-bottom: none !important;
                  border-radius: 8px 8px 0 0 !important;
                  padding: 10px 14px 4px !important;
                  font-size: 12px !important;
                  color: #64748b !important;
                  text-transform: uppercase;
                  letter-spacing: 0.03em;
              }
              .pay-value {
                  border-top: none !important;
                  border-radius: 0 0 8px 8px !important;
                  padding: 4px 14px 12px !important;
                  margin-bottom: 10px;
              }
              .total-amount {
                  font-size: 20px !important;
              }
              .cta-btn {
                  display: block !important;
                  width: 100% !important;
                  box-sizing: border-box !important;
                  padding: 16px 0 !important;
                  font-size: 15px !important;
              }
              .footer-section {
                  padding: 18px !important;
              }
          }
      </style>
  </head>
  <body class="email-body" style="
margin:0;
padding:40px 15px;
background:#f5f7fb;
font-family:Arial,sans-serif;
color:#374151;
">

<div class="email-wrapper" style="
max-width:600px;
width:100%;
margin:auto;
background:#ffffff;
">

<!-- Header -->

<div class="header-section" style="
background:linear-gradient(135deg,#ef4444,#dc2626);
padding:20px;
text-align:center;
">

<img
src="${websiteUrl}/logo.jpg"
width="120"
style="border-radius:12px;background:#fff;padding:8px;max-width:120px;"
>

<h1 class="header-title" style="
margin:25px 0 10px;
color:#fff;
font-size:32px;
">
Order Cancelled
</h1>

<p class="header-sub" style="
margin:0;
color:#fee2e2;
font-size:16px;
">
Your cancellation request has been completed successfully.
</p>

</div>

<!-- Content -->

<div class="content-section" style="padding:40px;">

<p style="
font-size:17px;
margin-top:0;
">
Hello <strong>${userName}</strong>,
</p>

<p style="
font-size:15px;
line-height:28px;
color:#6b7280;
">
Your order has been cancelled successfully. Below is a summary of your cancelled order.
</p>

<!-- Order Card -->

<div class="order-card" style="
margin:35px 0;
padding:25px;
background:#f8fafc;
border-radius:14px;
">

<h2 class="section-heading" style="
margin-top:0;
font-size:22px;
">
Order Details
</h2>

<table width="100%" cellpadding="0" cellspacing="0">

<tr>
<td style="padding:8px 0;word-break:break-word;"><strong>Tracking ID</strong></td>
<td style="word-break:break-word;">${order._id}</td>
</tr>

<tr>
<td style="padding:8px 0;"><strong>Payment Method</strong></td>
<td>${order.paymentMethod}</td>
</tr>

<tr>
<td style="padding:8px 0;"><strong>Status</strong></td>
<td style="color:#dc2626;font-weight:bold;">
Cancelled
</td>
</tr>

<tr>
<td style="padding:8px 0;"><strong>Date</strong></td>
<td>${new Date(order.updatedAt).toLocaleDateString()}</td>
</tr>

</table>

</div>

<!-- Products -->

<h2 class="section-heading" style="
margin-bottom:20px;
">
Cancelled Items
</h2>

<div class="table-scroll">
<table
class="items-table"
width="100%"
cellspacing="0"
style="
border:1px solid #eee;
border-radius:12px;
overflow:hidden;
">

<thead style="background:#f9fafb;">
<tr>

<th style="padding:16px;">#</th>
<th style="padding:16px;text-align:left;">Product</th>
<th style="padding:16px;">Price</th>
<th style="padding:16px;">Qty</th>
<th style="padding:16px;">Subtotal</th>

</tr>
</thead>

<tbody>

${productList}

</tbody>

</table>
</div>

<!-- Total -->

<div style="
margin-top:30px;
padding:25px;
background:#fff7ed;
border:1px solid #fed7aa;
border-radius:14px;
">

<table style="width:100%;">

<tr>

<td style="font-size:17px;">
<strong>Total Amount</strong>
</td>

<td
align="right"
class="total-amount"
style="
font-size:24px;
font-weight:bold;
color:#ea580c;
">

PKR ${order.totalPrice.toFixed(2)}

</td>

</tr>

</table>

</div>

${refundNote.replace('style="\nbackground:#f8fafc;', 'class="refund-box" style="\nbackground:#f8fafc;').replace('style="\nbackground:#fffbeb;', 'class="refund-box" style="\nbackground:#fffbeb;')}

<div style="
text-align:center;
margin-top:40px;
">

<a
href="${websiteUrl}/buyer/orders?tab=canceled"
class="cta-btn"
style="
display:inline-block;
padding:16px 34px;
background:#ea580c;
color:#fff;
text-decoration:none;
font-weight:bold;
border-radius:10px;
font-size:16px;
">

View Cancelled Orders

</a>

</div>

<p style="
margin-top:40px;
color:#6b7280;
line-height:28px;
">

If you have any questions regarding this cancellation or your refund, please contact our support team. We are always happy to help.

</p>

</div>

<!-- Footer -->

<div class="footer-section" style="
background:#f9fafb;
padding:25px;
text-align:center;
font-size:13px;
color:#9ca3af;
">

© ${new Date().getFullYear()} shovexa.com<br>

Thank you for shopping with us.

</div>

</div>

</body>
  </html>
  `;
};