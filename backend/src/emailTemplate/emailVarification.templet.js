export const emailVerificationTemp = (emailVerificationCode) => {
  const websiteUrl = process.env.WEBSITE_URL;

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>

    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: Arial, Helvetica, sans-serif;
        background: #fff7ed;
        padding: 40px 20px;
        color: #1f2937;
      }

      .container {
        max-width: 600px;
        margin: auto;
        background: #ffffff;
        border: 1px solid #fed7aa;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 12px 35px rgba(0,0,0,.08);
      }

      .header {
        background: linear-gradient(135deg,#f97316,#ea580c);
        padding: 45px 30px;
        text-align: center;
      }

      .logo {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        background: #ffffff;
        object-fit: cover;
        padding: 8px;
      }

      .brand {
        margin-top: 18px;
        font-size: 30px;
        font-weight: 700;
        color: #ffffff;
        letter-spacing: .5px;
      }

      .subtitle {
        margin-top: 8px;
        color: rgba(255,255,255,.9);
        font-size: 15px;
      }

      .content {
        padding: 40px 35px;
        text-align: center;
      }

      h2 {
        color: #111827;
        margin-bottom: 12px;
      }

      .text {
        color: #6b7280;
        font-size: 15px;
        line-height: 1.7;
      }

      .code {
        margin: 30px auto;
        display: inline-block;
        background: #fff7ed;
        border: 2px dashed #fb923c;
        color: #ea580c;
        font-size: 34px;
        font-weight: bold;
        letter-spacing: 10px;
        padding: 18px 32px;
        border-radius: 16px;
      }

      .note {
        margin-top: 20px;
        color: #6b7280;
        font-size: 14px;
      }

      .button {
        display: inline-block;
        margin-top: 30px;
        padding: 14px 30px;
        background: #f97316;
        color: #ffffff !important;
        text-decoration: none;
        border-radius: 10px;
        font-weight: bold;
      }

      .footer {
        background: #fafafa;
        border-top: 1px solid #eeeeee;
        text-align: center;
        padding: 25px;
        color: #9ca3af;
        font-size: 13px;
      }

      .footer a {
        color: #ea580c;
        text-decoration: none;
        font-weight: 600;
      }

      @media only screen and (max-width:600px) {
        .content {
          padding: 30px 20px;
        }

        .code {
          font-size: 26px;
          letter-spacing: 6px;
          padding: 15px 20px;
        }

        .brand {
          font-size: 26px;
        }
      }
    </style>
  </head>

  <body>

    <div class="container">

      <div class="header">
        <img
          src="${websiteUrl}/logo.jpg"
          alt="Shovexa Logo"
          class="logo"
        />

        <div class="brand">Shovexa</div>

        <div class="subtitle">
          Secure Email Verification
        </div>
      </div>

      <div class="content">

        <h2>Verify Your Email</h2>

        <p class="text">
          Welcome to Shovexa.
          Use the verification code below to complete your email verification.
        </p>

        <div class="code">
          ${emailVerificationCode}
        </div>

        <p class="note">
          This verification code will expire soon.
          If you didn't request this email, you can safely ignore it.
        </p>

        <a href="${websiteUrl}" class="button">
          Visit Shovexa
        </a>

      </div>

      <div class="footer">
        © ${new Date().getFullYear()}
        <a href="${websiteUrl}" target="_blank">
          Shovexa
        </a>
        . All rights reserved.
      </div>

    </div>

  </body>
  </html>
  `;
};