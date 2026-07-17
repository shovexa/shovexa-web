export const customerContactTemp = (name, email, message) => {
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
              max-width: 600px;
              margin: 30px auto;
              background: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(0,0,0,0.05);
              border: 1px solid #fce8d8;
          }
          .header {
              background: linear-gradient(135deg, #ea580c, #f59e0b);
              color: #ffffff;
              text-align: center;
              padding: 22px 20px;
          }
          .header h2 {
              margin: 0;
              font-size: 20px;
              font-weight: 600;
          }
          .badge {
              display: inline-block;
              background: rgba(255,255,255,0.2);
              color: #ffffff;
              font-size: 11px;
              font-weight: 700;
              letter-spacing: 1px;
              text-transform: uppercase;
              padding: 4px 12px;
              border-radius: 999px;
              margin-bottom: 10px;
          }
          .content {
              padding: 25px 30px 10px;
              color: #333;
              font-size: 15px;
          }
          .field {
              background-color: #fff7ed;
              border-left: 4px solid #ea580c;
              border-radius: 6px;
              padding: 12px 16px;
              margin: 0 0 14px;
          }
          .label {
              font-weight: 600;
              color: #7c2d12;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin: 0 0 4px;
          }
          .value {
              margin: 0;
              color: #333;
          }
          .message-field {
              white-space: pre-line;
          }
          .footer {
              text-align: center;
              font-size: 12px;
              color: #a8887a;
              padding: 18px 30px 22px;
              border-top: 1px solid #f3e4d7;
              margin-top: 10px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <div class="badge">New Message</div>
              <h2>${name} sent you a message</h2>
          </div>
          <div class="content">
              <div class="field">
                  <p class="label">Name</p>
                  <p class="value">${name}</p>
              </div>

              <div class="field">
                  <p class="label">Email</p>
                  <p class="value">${email}</p>
              </div>

              <div class="field">
                  <p class="label">Message</p>
                  <p class="value message-field">${message}</p>
              </div>
          </div>

          <div class="footer">
              <p>This message was sent from the contact form on <strong style="color:#7c2d12;">shovexa.com</strong>.</p>
          </div>
      </div>
  </body>
  </html>
  `;
};