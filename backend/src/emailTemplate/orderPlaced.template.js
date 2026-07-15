export const orderConfirmationTemp = (order, orderedProducts, userName) => {
  const websiteUrl = process.env.WEBSITE_URL;

  const productList = orderedProducts
    .map((item) => {
        console.log('item',item)
      const matchedProduct = order.products.find(
        (p) => p.productId.toString() === item._id.toString()
      );

      const quantity = matchedProduct ? matchedProduct.quantity : 0;

      return `
        <tr>
          <td style="padding:14px;border-bottom:1px solid #f3f4f6;">
            <img
              src="${item.image}"
              alt="${item.title}"
              style="width:70px;height:70px;border-radius:12px;object-fit:cover;border:1px solid #f3f4f6;"
            />
          </td>

          <td style="padding:14px;border-bottom:1px solid #f3f4f6;">
            <div style="font-weight:600;color:#1f2937;">
              ${item.title}
            </div>

            <div style="margin-top:6px;color:#f97316;font-size:13px;">
              Qty: ${quantity}
            </div>
          </td>

          <td
            style="padding:14px;border-bottom:1px solid #f3f4f6;text-align:right;font-weight:700;color:#111827;"
          >
            PKR ${Number(item.price).toLocaleString()}
          </td>
        </tr>
      `;
    })
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>

<style>

*{
box-sizing:border-box;
}

body{
margin:0;
padding:40px 15px;
background:#fff7ed;
font-family:Arial,sans-serif;
color:#374151;
}

.wrapper{
max-width:700px;
margin:auto;
background:#ffffff;
border-radius:24px;
overflow:hidden;
box-shadow:0 20px 50px rgba(0,0,0,.08);
}

.hero{
background:linear-gradient(135deg,#f97316,#fb923c);
padding:45px 30px;
text-align:center;
color:white;
}

.logo{
width:90px;
height:90px;
border-radius:50%;
background:white;
padding:10px;
object-fit:contain;
}

.hero h1{
margin:20px 0 10px;
font-size:30px;
}

.hero p{
margin:0;
font-size:15px;
color:#ffedd5;
line-height:1.7;
}

.content{
padding:35px;
}

.track{
background:#fff7ed;
border:1px dashed #fb923c;
border-radius:16px;
padding:18px;
margin-bottom:28px;
}

.track span{
display:block;
font-size:12px;
color:#6b7280;
margin-bottom:8px;
}

.track strong{
font-size:15px;
color:#ea580c;
word-break:break-word;
}

.section-title{
font-size:20px;
font-weight:bold;
color:#111827;
margin-bottom:20px;
}

table{
width:100%;
border-collapse:collapse;
}

.summary{
margin-top:30px;
background:#fafafa;
border-radius:18px;
padding:20px;
}

.summary-row{
display:flex;
justify-content:space-between;
margin-bottom:14px;
font-size:15px;
}

.total{
font-size:22px;
font-weight:bold;
color:#f97316;
}

.btn{
display:block;
margin-top:35px;
background:#f97316;
color:white !important;
text-decoration:none;
padding:16px;
border-radius:14px;
font-weight:bold;
text-align:center;
font-size:16px;
}

.footer{
padding:30px;
text-align:center;
font-size:13px;
color:#9ca3af;
border-top:1px solid #f3f4f6;
}

@media(max-width:600px){

body{
padding:10px;
}

.content{
padding:20px;
}

.hero{
padding:30px 20px;
}

.hero h1{
font-size:24px;
}

.summary-row{
font-size:14px;
}

.total{
font-size:18px;
}

}

</style>

</head>

<body>

<div class="wrapper">

<div class="hero">

<img
src="${websiteUrl}/logo.jpg"
class="logo"
alt="Shovexa"
/>

<h1>Order Confirmed 🎉</h1>

<p>
Thank you ${
    userName || "Customer"
  }. Your order has been successfully placed and is now being processed.
</p>

</div>

<div class="content">

<div class="track">

<span>Tracking ID</span>

<strong>${order._id}</strong>

</div>

<div class="section-title">
Order Items
</div>

<table>

${productList}

</table>

<div class="summary">

<div class="summary-row">
<span>Payment Method</span>
<strong>${order.paymentMethod}</strong>
</div>

<div class="summary-row">
<span>Tax</span>
<strong>PKR ${order.taxPrice?.toLocaleString()}</strong>
</div>

<div class="summary-row">
<span>Shipping</span>
<strong>PKR ${order.shippingPrice?.toLocaleString()}</strong>
</div>

<hr style="border:none;border-top:1px solid #e5e7eb;margin:18px 0;">

<div class="summary-row total">
<span>Total</span>
<span>PKR ${order.totalPrice?.toLocaleString()}</span>
</div>

</div>

<a
href="${websiteUrl}/buyer/orders"
class="btn"
>
View My Orders
</a>

</div>

<div class="footer">

<strong>Shovexa</strong><br><br>

Thank you for shopping with us.<br>

We'll notify you as soon as your order ships.

<br><br>

© ${new Date().getFullYear()} Shovexa. All rights reserved.

</div>

</div>

</body>
</html>
`;
};