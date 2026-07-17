export const customerContactConfirmationTemp = (name) => {
  const websiteUrl = process.env.WEBSITE_URL

  return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
          body {
              font-family: 'Segoe UI', Arial, sans-serif;
              background-color: #FBF3EC;
              margin: 0;
              padding: 0;
              line-height: 1.6;
          }
          .container {
              max-width: 520px;
              margin: 30px auto;
              background: #ffffff;
              border-radius: 14px;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          }
          .top-strip {
              height: 6px;
              background: linear-gradient(90deg, #ea580c, #f59e0b);
          }
          .top-row {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 24px 30px 0;
          }
          .logo {
              height: 34px;
          }
          .ticket-tag {
              background-color: #fff2e2;
              color: #ea580c;
              font-size: 11px;
              font-weight: 700;
              letter-spacing: 0.5px;
              text-transform: uppercase;
              padding: 5px 12px;
              border-radius: 999px;
              border: 1px solid #fed7aa;
          }
          .content {
              padding: 26px 30px 10px;
              color: #333;
              font-size: 15px;
          }
          .content h1 {
              color: #7c2d12;
              font-size: 23px;
              font-weight: 700;
              margin: 0 0 16px;
          }
          .content p {
              margin: 0 0 14px;
              color: #444;
          }
          .highlight {
              color: #ea580c;
              font-weight: 600;
          }
          .ticket-box {
              display: flex;
              align-items: flex-start;
              gap: 14px;
              background-color: #fff7ed;
              border: 1px dashed #fed7aa;
              border-radius: 10px;
              padding: 16px 18px;
              margin: 18px 0 24px;
          }
          .ticket-icon {
              width: 36px;
              height: 36px;
              line-height: 36px;
              background-color: #ea580c;
              border-radius: 8px;
              text-align: center;
              font-size: 16px;
              color: #ffffff;
              flex-shrink: 0;
          }
          .ticket-box p {
              margin: 0;
              font-size: 13.5px;
              color: #7c5b4a;
          }
          .ticket-box strong {
              display: block;
              color: #7c2d12;
              font-size: 14.5px;
              margin-bottom: 2px;
          }
          .btn {
              display: inline-block;
              background-color: #ea580c;
              color: #ffffff !important;
              text-decoration: none;
              padding: 12px 28px;
              border-radius: 8px;
              font-weight: 600;
              font-size: 14px;
          }
          .footer {
              padding: 20px 30px 26px;
              border-top: 1px solid #f3e4d7;
              font-size: 12px;
              color: #a8887a;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="top-strip"></div>

          <div class="top-row">
              <img src="${websiteUrl}/logo.jpg" alt="Shovexa Logo" class="logo" />
              <span class="ticket-tag">Message Received</span>
          </div>

          <div class="content">
              <h1>Thanks for reaching out, ${name || "there"}.</h1>
              <p>Your message has reached the <span class="highlight">Shovexa</span> support team and is now in our queue.</p>

              <div class="ticket-box">
                  <span class="ticket-icon">✓</span>
                  <p>
                      <strong>You're all set</strong>
                      No action needed on your end — we'll reply to the email address you contacted us from as soon as our team has an update for you.
                  </p>
              </div>

              <a href="${websiteUrl}" class="btn">Continue Browsing</a>
          </div>

          <div class="footer">
              <p>© ${new Date().getFullYear()} shovexa.com. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
  `;
};