export const orderPlacedSellerTemplate = (order, orderedProducts) => {
    const websiteUrl = process.env.WEBSITE_URL;

    const productList = orderedProducts
        .map((item, index) => {
            const matchedProduct = order.products.find(
                p => p.productId.toString() === item._id.toString()
            );
            const quantity = matchedProduct ? matchedProduct.quantity : 0;

            return `
        <tr>
          <td style="padding:12px;border-bottom:1px solid #e0e0e0;text-align:center;font-family:Arial,sans-serif;color:#555;">${index + 1}</td>
          <td style="padding:12px;border-bottom:1px solid #e0e0e0;">
            <div style="display:flex;align-items:center;gap:14px;">
              <img src="${item.image}" 
                   alt="${item.title || "Product Image"}"
                   style="width:60px;height:60px;object-fit:cover;border-radius:6px;border:1px solid #f0f0f0;"/>
            </div>
          </td>
          <td
           style="padding:12px;border-bottom:1px solid #e0e0e0;text-align:center;font-family:Arial,sans-serif;color:#555;">
           PKR ${(item.price)}
           </td>
          <td 
          style="padding:12px;border-bottom:1px solid #e0e0e0;text-align:center;font-family:Arial,sans-serif;color:#555;font-weight:600;">
          ${quantity}
          </td>
        </tr>`;
        })
        .join("");

    return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
          body {
              font-family: 'Segoe UI', Arial, sans-serif;
              background-color: #f8f9fa;
              margin: 0;
              padding: 0;
              line-height: 1.6;
          }
          .container {
              max-width: 700px;
              margin: 30px auto;
              background: #ffffff;
              padding: 30px;
              border-radius: 12px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          }
          .header {
              text-align: center;
              padding-bottom: 20px;
              border-bottom: 1px solid #eaeaea;
              margin-bottom: 25px;
          }
          .logo {
              height: 50px;
              margin-bottom: 15px;
          }
          .order-header {
              color: #2c3e50;
              font-size: 24px;
              font-weight: 600;
              margin: 15px 0 10px 0;
          }
          .subheader {
              color: #666;
              font-size: 16px;
              margin-bottom: 20px;
          }
          .order-info {
              background: #f8f9fa;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              border-left: 4px solid #3498db;
          }
          .info-label {
              font-weight: 600;
              color: #2c3e50;
             display: flex;
              flex-wrap: wrap;
             gap: 12px;
              width: 120px;
          }
          .info-value {
              color: #555;
          }
          table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
              background: #fff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          }
          th {
              background-color: #2c3e50;
              color: white;
              padding: 14px 12px;
              text-align: center;
              font-weight: 600;
              font-size: 14px;
          }
          .total-section {
              background: #f8f9fa;
              padding: 20px;
              border-radius: 8px;
              margin: 25px 0;
              text-align: center;
          }
          .total-amount {
              font-size: 20px;
              font-weight: 700;
              color: #27ae60;
          }
          .btn {
              display: inline-block;
              background: linear-gradient(135deg, #3498db, #2980b9);
              color: #ffffff;
              padding: 14px 32px;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 600;
              font-size: 15px;
              margin: 20px 0;
              transition: all 0.3s ease;
              box-shadow: 0 2px 8px rgba(52, 152, 219, 0.3);
          }
          .btn:hover {
              background: linear-gradient(135deg, #2980b9, #3498db);
              box-shadow: 0 4px 12px rgba(52, 152, 219, 0.4);
              transform: translateY(-1px);
          }
          .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #eaeaea;
              text-align: center;
              font-size: 13px;
              color: #7f8c8d;
          }
          .highlight {
              color: #2c3e50;
              font-weight: 600;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <img src="${websiteUrl}/logo.jpg" alt="Saadi Collection Logo" class="logo"/>
              <h1 class="order-header">New Order Received</h1>
              <p class="subheader">A customer has placed an order for your products</p>
          </div>

          <div class="order-info">
              <div><span class="info-label">Order ID:</span> <span class="info-value">${order._id.toString()}</span></div>
              <div><span class="info-label">Date:</span> <span class="info-value">${new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })}</span></div>
              <div><span class="info-label">Payment Method:</span> <span class="info-value">${order.paymentMethod || "Not specified"}</span></div>
          </div>

          <h3 style="color:#2c3e50;margin-bottom:15px;font-size:18px;">Order Items</h3>
          <table>
              <thead>
                  <tr>
                      <th>#</th>
                      <th>Product Details</th>
                      <th>Unit Price</th>
                      <th>Qty</th>
                  </tr>
              </thead>
              <tbody>
                  ${productList}
              </tbody>
          </table>

          <div class="total-section">
              <div style="margin-bottom:10px;">
                  <span style="color:#555;">Subtotal:</span> 
                  <span style="float:right;font-weight:600;">PKR ${(order.totalPrice - (order.taxPrice || 0) - (order.shippingPrice || 0))?.toFixed(2) || "0.00"}</span>
              </div>
              <div style="margin-bottom:10px;">
                  <span style="color:#555;">Tax:</span> 
                  <span style="float:right;font-weight:600;">PKR ${order.taxPrice?.toFixed(2) || "0.00"}</span>
              </div>
              <div style="margin-bottom:10px;">
                  <span style="color:#555;">Shipping:</span> 
                  <span style="float:right;font-weight:600;">PKR ${order.shippingPrice?.toFixed(2) || "0.00"}</span>
              </div>
              <div style="border-top:2px solid #e0e0e0;padding-top:10px;margin-top:10px;">
                  <span style="color:#2c3e50;font-weight:600;font-size:16px;">Total Amount:</span> 
                  <span class="total-amount" style="float:right;">PKR ${order.totalPrice?.toFixed(2) || "0.00"}</span>
              </div>
          </div>

          <div style="text-align:center;">
              <a href="${websiteUrl}/seller/orders" class="btn">Manage Order</a>
          </div>

          <div class="footer">
              <p>© ${new Date().getFullYear()} shovexa.com. All rights reserved.</p>
              <p style="margin-top:5px;color:#95a5a6;">This is an automated notification. Please do not reply to this email.</p>
          </div>
      </div>
  </body>
  </html>`;
};