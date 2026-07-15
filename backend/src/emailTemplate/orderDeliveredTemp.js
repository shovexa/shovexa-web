export const orderDelivered = (order) => {
    const websiteUrl = process.env.WEBSITE_URL;
    return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation - Saadi Collection</title>
    <style>
        /* Base Styles */
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8f9fa;
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
        }
        
        /* Header */
        .header {
            background: linear-gradient(135deg, #4a6fa5, #2c3e50);
            color: white;
            padding: 25px 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        
        /* Content */
        .content {
            padding: 30px;
        }
        
        /* Order Status */
        .status-badge {
            display: inline-block;
            background-color: #28a745;
            color: white;
            padding: 6px 15px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 20px;
        }
        
        /* Order Summary */
        .order-summary {
            background-color: #f8f9fa;
            border-radius: 6px;
            padding: 20px;
            margin: 20px 0;
        }
        .order-summary h2 {
            margin-top: 0;
            font-size: 18px;
            color: #2c3e50;
            border-bottom: 1px solid #eaeaea;
            padding-bottom: 10px;
        }
        
        /* Product Table */
        .product-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        .product-table th {
            background-color: #f1f5f9;
            text-align: left;
            padding: 12px 15px;
            font-weight: 600;
            color: #2c3e50;
            border-bottom: 1px solid #e1e5e9;
        }
        .product-table td {
            padding: 12px 15px;
            border-bottom: 1px solid #eaeaea;
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
            background-color: #f8f9fa;
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
            border-top: 1px solid #ddd;
            font-weight: 700;
            font-size: 18px;
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
            background-color: #f8f9fa;
            border-radius: 6px;
            padding: 15px;
        }
        .info-box h3 {
            margin-top: 0;
            font-size: 16px;
            color: #2c3e50;
        }
        
        /* Buttons */
        .button-container {
            text-align: center;
            margin: 30px 0 20px;
        }
        .btn {
            display: inline-block;
            background: linear-gradient(135deg, #4a6fa5, #2c3e50);
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
            border: 1px solid #4a6fa5;
            color: #4a6fa5;
        }
        
        /* Footer */
        .footer {
            background-color: #f1f5f9;
            padding: 20px 30px;
            text-align: center;
            color: #6c757d;
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
            <h1>Order Confirmation</h1>
            <p>Thank you for your purchase!</p>
        </div>
        
        <!-- Content -->
        <div class="content">
            <div class="status-badge">Order Confirmed</div>
            
            <p>Dear <strong>${order.userId.username}</strong>,</p>
            
            <p>Thank you for shopping with Saadi Collection. We're pleased to confirm that your order has been received and is being processed.</p>
            
            <!-- Order Summary -->
            <div class="order-summary">
                <h2>Order Summary</h2>
                <p><strong>Order ID:</strong> ${order._id}</p>
                <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
            </div>
            
            <!-- Products -->
            <h2>Order Items</h2>
            <table class="product-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    ${order.products.map(product => `
                    <tr>
                        <img src="${product.productId.image}" />
                        <td>${product.quantity}</td>
                    </tr>     
                    `).join('')}
                </tbody>
            </table>
            
            <!-- Price Breakdown -->
            <div class="price-breakdown">
                <h2>Price Breakdown</h2>
                <table>
                    <tr>
                        <td>Subtotal:</td>
                        <td class="value">PKR${((order.totalPrice - order.shippingPrice - order.taxPrice).toFixed(2))}</td>
                    </tr>
                    <tr>
                        <td>Shipping:</td>
                        <td class="value">PKR${(order.shippingPrice.toFixed(2))}</td>
                    </tr>
                    <tr>
                        <td>Tax:</td>
                        <td class="value">PKR${(order.taxPrice.toFixed(2))}</td>
                    </tr>
                    <tr class="total-row">
                        <td>Total:</td>
                        <td class="value">PKR${(order.totalPrice.toFixed(2))}</td>
                    </tr>
                </table>
            </div>
            
            <!-- Customer Information -->
                
              <table class="customer-info" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px;">
  <tr>
    <td valign="top" width="50%" style="padding:10px; border:1px solid #eee;">
      <h3 style="margin:0 0 10px 0;">Customer Information</h3>
      <p><strong>Name:</strong> ${order.userId.username || "Customer"}</p>
      <p><strong>Email:</strong> ${order.userId.email || "Not provided"}</p>
      <p><strong>Phone:</strong> ${order.userId.phone || "Not provided"}</p>
    </td>

    <td valign="top" width="50%" style="padding:10px; border:1px solid #eee;">
      <h3 style="margin:0 0 10px 0;">Order Status</h3>
      <p><strong>Payment:</strong> ${order.isPaid ? 'Paid' : 'Pending'}</p>
      <p><strong>Confirmed:</strong> ${order.confirmed ? 'Yes' : 'No'}</p>
      <p><strong>Delivery:</strong> ${order.isDelivered ? 'Delivered' : 'Processing'}</p>
    </td>
  </tr>
</table>
            
            <!-- Call to Action -->
            <div class="button-container">
                <a href="${websiteUrl}/buyer/orders" class="btn">View Your Orders</a>
                <a href="${websiteUrl}" class="btn btn-outline">Continue Shopping</a>
            </div>
            
            <p>If you have any questions about your order, please don't hesitate to contact our customer service team.</p>
            
            <p>Best regards,<br><strong>The Saadi Collection Team</strong></p>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p>© ${new Date().getFullYear()} Saadi Collection. All rights reserved.</p>
            <p>This email was sent to ${order.userId.email} as part of your Saadi Collection account.</p>
        </div>
    </div>
</body>
</html>
  `
        ;
};
