export const orderPickedByCourierTemp = (order) => {
  const websiteUrl = process.env.WEBSITE_URL;

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Picked Up - Shovexa</title>
      <style>
          /* Base Styles */
          body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #FBF3EC;
              margin: 0;
              padding: 0;
              color: #333;
              line-height: 1.6;
          }
          .container {
              max-width: 600px;
              margin: 0 auto;
              background: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
              border: 1px solid #fce8d8;
          }
          
          /* Header */
          .header {
              background: linear-gradient(135deg, #ea580c, #f59e0b);
              color: white;
              padding: 25px 30px;
              text-align: center;
          }
          .header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: 600;
          }
          .header p {
              margin: 8px 0 0;
              opacity: 0.9;
          }
          
          /* Content */
          .content {
              padding: 30px;
          }
          
          /* Status Badge */
          .status-badge {
              display: inline-block;
              background-color: #ea580c;
              color: white;
              padding: 6px 15px;
              border-radius: 20px;
              font-size: 14px;
              font-weight: 600;
              margin-bottom: 20px;
          }

          /* Tracking banner */
          .tracking-banner {
              background: linear-gradient(135deg, #fff7ed, #ffedd5);
              border: 1px solid #fed7aa;
              border-radius: 6px;
              padding: 16px 20px;
              margin: 20px 0;
              display: flex;
              align-items: center;
              gap: 14px;
          }
          .tracking-icon {
              width: 40px;
              height: 40px;
              flex-shrink: 0;
              background-color: #ea580c;
              border-radius: 50%;
              display: inline-block;
              text-align: center;
              line-height: 40px;
              color: white;
              font-size: 18px;
          }
          
          /* Order Summary */
          .order-summary {
              background-color: #fff7ed;
              border-radius: 6px;
              padding: 20px;
              margin: 20px 0;
          }
          .order-summary h2 {
              margin-top: 0;
              font-size: 18px;
              color: #7c2d12;
              border-bottom: 1px solid #f3e4d7;
              padding-bottom: 10px;
          }
          
          /* Product Table */
          .product-table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
          }
          .product-table th {
              background-color: #fff2e2;
              text-align: left;
              padding: 12px 15px;
              font-weight: 600;
              color: #7c2d12;
              border-bottom: 1px solid #f3e4d7;
          }
          .product-table td {
              padding: 12px 15px;
              border-bottom: 1px solid #f3e4d7;
          }
          .product-table tr:last-child td {
              border-bottom: none;
          }
                 img {
               width: 60px;
               height: 60px;
               object-fit: cover;
               border-radius: 4px;
            }
          /* Price Breakdown */
          .price-breakdown {
              background-color: #fff7ed;
              border-radius: 6px;
              padding: 20px;
              margin: 20px 0;
          }
          .price-breakdown table {
              width: 100%;
          }
          .price-breakdown td {
              padding: 8px 0;
          }
          .price-breakdown .total-row {
              border-top: 1px solid #f3e4d7;
              font-weight: 700;
              font-size: 18px;
              color: #7c2d12;
          }
          .price-breakdown .value {
              text-align: right;
          }
          
          /* Customer Info */
          .customer-info {
              display: flex;
              flex-wrap: wrap;
              gap: 20px;
              margin: 20px 0;
          }
          .info-box {
              flex: 1;
              min-width: 200px;
              background-color: #fff7ed;
              border-radius: 6px;
              padding: 15px;
          }
          .info-box h3 {
              margin-top: 0;
              font-size: 16px;
              color: #7c2d12;
          }
          
          /* Buttons */
          .button-container {
              text-align: center;
              margin: 30px 0 20px;
          }
          .btn {
              display: inline-block;
              background: linear-gradient(135deg, #ea580c, #f59e0b);
              color: white;
              padding: 12px 25px;
              text-decoration: none;
              border-radius: 4px;
              font-weight: 600;
              font-size: 15px;
              margin: 0 10px;
              transition: all 0.3s ease;
          }
          .btn:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .btn-outline {
              background: transparent;
              border: 1px solid #ea580c;
              color: #ea580c;
          }
          
          /* Footer */
          .footer {
              background-color: #fff2e2;
              padding: 20px 30px;
              text-align: center;
              color: #a8887a;
              font-size: 14px;
          }
          .footer p {
              margin: 5px 0;
          }
          
          /* Responsive */
          @media (max-width: 600px) {
              .content {
                  padding: 20px;
              }
              .customer-info {
                  flex-direction: column;
              }
              .btn {
                  display: block;
                  margin: 10px 0;
              }
          }
      </style>
  </head>
  <body>
      <div class="container">
          <!-- Header -->
          <div class="header">
              <h1>Your Order Is On Its Way!</h1>
              <p>Picked up by our courier partner</p>
          </div>
          
          <!-- Content -->
          <div class="content">
              <div class="status-badge">Picked Up by Courier</div>
              
              <p>Dear <strong>${order.userId.username || "Customer"}</strong>,</p>
              
              <p>Good news! Your order has been picked up by our courier partner and is now on its way to you. We'll let you know as soon as it's delivered.</p>

              <div class="tracking-banner">
                  <span class="tracking-icon">🚚</span>
                  <div>
                      <strong style="color:#7c2d12;">Out for delivery soon</strong><br/>
                      <span style="color:#7c5b4a;font-size:14px;">Your package is with the courier and moving toward you.</span>
                  </div>
              </div>
              
              <!-- Order Summary -->
              <div class="order-summary">
                  <h2>Order Summary</h2>
                  <p><strong>Order ID:</strong> ${order._id.toString()}</p>
                  <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p><strong>Payment Method:</strong> ${order.paymentMethod || "Not provided"}</p>
              </div>
              
              <!-- Products -->
              <h2 style="color:#7c2d12;">Order Items</h2>
              <table class="product-table">
           <thead>
<tr>
    <th>Image</th>
    <th>Product</th>
    <th>Quantity</th>
</tr>
</thead>
                  <tbody>
                 ${order.products
  .map(
    (product) => `
<tr>
    <td>
        <img
            src="${product.productId.image}"
            alt="${product.productId.title}"
            width="60"
            height="60"
            style="display:block;border-radius:6px;"
        />
    </td>

    <td>
        ${product.productId.title}
    </td>

    <td>
        ${product.quantity}
    </td>
</tr>
`
  )
  .join("")}
                  </tbody>
              </table>
              
              <!-- Price Breakdown -->
              <div class="price-breakdown">
                  <h2 style="color:#7c2d12;">Price Breakdown</h2>
                  <table>
                      <tr>
                          <td>Subtotal:</td>
                          <td class="value">PKR ${((order.totalPrice - order.shippingPrice - order.taxPrice).toFixed(2))}</td>
                      </tr>
                      <tr>
                          <td>Shipping:</td>
                          <td class="value">PKR ${(order.shippingPrice?.toFixed(2) || "0.00")}</td>
                      </tr>
                      <tr>
                          <td>Tax:</td>
                          <td class="value">PKR ${(order.taxPrice?.toFixed(2) || "0.00")}</td>
                      </tr>
                      <tr class="total-row">
                          <td>Total:</td>
                          <td class="value">PKR ${(order.totalPrice?.toFixed(2) || "0.00")}</td>
                      </tr>
                  </table>
              </div>
              
              <!-- Customer Information -->
              <table class="customer-info" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px;">
  <tr>
    <td valign="top" width="50%" style="padding:10px; border:1px solid #f3e4d7;">
      <h3 style="margin:0 0 10px 0;color:#7c2d12;">Customer Information</h3>
      <p><strong>Name:</strong> ${order.userId.username || "Customer"}</p>
      <p><strong>Email:</strong> ${order.userId.email || "Not provided"}</p>
      <p><strong>Phone:</strong> ${order.userId.phone || "Not provided"}</p>
    </td>

    <td valign="top" width="50%" style="padding:10px; border:1px solid #f3e4d7;">
      <h3 style="margin:0 0 10px 0;color:#7c2d12;">Order Status</h3>
      <p><strong>Payment:</strong> ${order.isPaid ? 'Paid' : 'Pending'}</p>
      <p><strong>Confirmed:</strong> ${order.confirmed ? 'Yes' : 'No'}</p>
      <p><strong>Delivery:</strong> Picked up by courier</p>
    </td>
  </tr>
</table>

              
              <!-- Call to Action -->
              <div class="button-container">
                  <a href="${websiteUrl}/buyer/orders" class="btn">Track Your Order</a>
                  <a href="${websiteUrl}" class="btn btn-outline">Continue Shopping</a>
              </div>
              
              <p>If you have any questions about your delivery, please don't hesitate to contact our customer service team.</p>
              
              <p>Best regards,<br><strong>The Shovexa Team</strong></p>
          </div>
          
          <!-- Footer -->
          <div class="footer">
              <p>© ${new Date().getFullYear()} shovexa.com  All rights reserved.</p>
              <p>This email was sent to ${order.userId.email} as part of your shovexa account.</p>
          </div>
      </div>
  </body>
  </html>
  `;
};