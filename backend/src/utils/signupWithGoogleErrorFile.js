export const signupWithGoogleError = (info) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account Access Required</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f8fafc;
                color: #334155;
                line-height: 1.6;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                padding: 20px;
            }
            
            .container {
                background-color: #ffffff;
                padding: 48px 40px;
                border-radius: 12px;
                box-shadow: 0 4px 25px rgba(0, 0, 0, 0.08);
                text-align: center;
                max-width: 440px;
                width: 100%;
                border: 1px solid #e2e8f0;
            }
            
            .error-icon {
                color: #dc2626;
                font-size: 48px;
                margin-bottom: 24px;
            }
            
            h1 {
                color: #1e293b;
                margin-bottom: 16px;
                font-size: 24px;
                font-weight: 600;
            }
            
            .error-message {
                color: #dc2626;
                background-color: #fef2f2;
                padding: 16px;
                border-radius: 8px;
                border-left: 4px solid #dc2626;
                margin-bottom: 24px;
                font-weight: 500;
                text-align: left;
            }
            
            .instruction {
                color: #64748b;
                margin-bottom: 32px;
                font-size: 16px;
            }
            
            .login-button {
                display: inline-block;
                background-color: #2563eb;
                color: #ffffff;
                padding: 14px 32px;
                border-radius: 8px;
                text-decoration: none;
                font-weight: 600;
                font-size: 16px;
                transition: all 0.3s ease;
                border: none;
                cursor: pointer;
                margin-bottom: 24px;
            }
            
            .login-button:hover {
                background-color: #1d4ed8;
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
            }
            
            .support-text {
                color: #94a3b8;
                font-size: 14px;
                margin-top: 16px;
            }
            
            @media (max-width: 480px) {
                .container {
                    padding: 32px 24px;
                }
                
                h1 {
                    font-size: 20px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="error-icon">⚠️</div>
            <h1>Authentication Required</h1>
            <div class="error-message">${info.message}</div>
            <p class="instruction">Please access your account using your email and password credentials.</p>
            <a href="${process.env.CORS_ORIGIN}/login" class="login-button">Proceed to Login</a>
            <p class="support-text">If you need assistance, please contact our support team.</p>
        </div>
    </body>
    </html>
  `;
};