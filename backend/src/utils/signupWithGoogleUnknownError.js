export const signupWithGoogleUnknownError=(err)=>{
    return`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>System Error - Authentication Service</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #334155;
            line-height: 1.6;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 20px;
        }
        
        .error-container {
            background-color: #ffffff;
            padding: 48px;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
            text-align: center;
            max-width: 500px;
            width: 100%;
            border: 1px solid #e2e8f0;
        }
        
        .error-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #feb2b2 0%, #fc8181 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 24px;
            font-size: 36px;
            color: #c53030;
        }
        
        h1 {
            color: #1a202c;
            margin-bottom: 16px;
            font-size: 28px;
            font-weight: 700;
        }
        
        .error-code {
            color: #718096;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 8px;
        }
        
        .error-description {
            color: #4a5568;
            margin-bottom: 32px;
            font-size: 16px;
        }
        
        .button-group {
            display: flex;
            gap: 16px;
            justify-content: center;
            margin-bottom: 32px;
            flex-wrap: wrap;
        }
        
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 14px 28px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 15px;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            min-width: 140px;
        }
        
        .btn-primary {
            background-color: #4299e1;
            color: #ffffff;
        }
        
        .btn-primary:hover {
            background-color: #3182ce;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(66, 153, 225, 0.3);
        }
        
        .btn-secondary {
            background-color: #e2e8f0;
            color: #4a5568;
        }
        
        .btn-secondary:hover {
            background-color: #cbd5e0;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
        }
        
        .btn-outline {
            background-color: transparent;
            color: #4299e1;
            border: 2px solid #4299e1;
        }
        
        .btn-outline:hover {
            background-color: #4299e1;
            color: #ffffff;
            transform: translateY(-2px);
        }
        
        .technical-info {
            background-color: #f7fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 16px;
            margin-top: 24px;
            text-align: left;
        }
        
        .technical-info summary {
            font-weight: 600;
            color: #4a5568;
            cursor: pointer;
            margin-bottom: 8px;
        }
        
        .technical-info pre {
            background-color: #edf2f7;
            padding: 12px;
            border-radius: 6px;
            font-size: 13px;
            color: #2d3748;
            overflow-x: auto;
            margin-top: 8px;
        }
        
        .support-section {
            border-top: 1px solid #e2e8f0;
            padding-top: 24px;
            margin-top: 24px;
        }
        
        .support-text {
            color: #718096;
            font-size: 14px;
            margin-bottom: 16px;
        }
        
        .contact-info {
            display: flex;
            justify-content: center;
            gap: 24px;
            flex-wrap: wrap;
        }
        
        .contact-item {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #4a5568;
            font-size: 14px;
        }
        
        @media (max-width: 480px) {
            .error-container {
                padding: 32px 24px;
            }
            
            .button-group {
                flex-direction: column;
            }
            
            .btn {
                width: 100%;
            }
            
            h1 {
                font-size: 24px;
            }
        }

        .loading-dots {
            display: inline-flex;
            margin-left: 8px;
        }
        
        .loading-dots span {
            animation: loading 1.4s ease-in-out infinite both;
            background-color: currentColor;
            border-radius: 50%;
            display: inline-block;
            height: 4px;
            margin: 0 1px;
            width: 4px;
        }
        
        .loading-dots span:nth-child(1) { animation-delay: -0.32s; }
        .loading-dots span:nth-child(2) { animation-delay: -0.16s; }
        
        @keyframes loading {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
        }
    </style>
</head>
<body>
    <div class="error-container">
        <div class="error-icon">⚠️</div>
        
        <div class="error-code">Error 500 - Internal Server Error</div>
        <h1>Something Went Wrong</h1>
        
        <p class="error-description">
            We encountered an unexpected error while processing your request. 
            This might be temporary, so please try again in a few moments.
        </p>
        <p class="error-description">
          ${err}
        </p>
        
        <div class="button-group">
            <a href=${process.env.CORS_ORIGIN}/login class="btn btn-primary" id="loginBtn">
                Back to Login
                <div class="loading-dots" style="display: none;" id="loginLoading">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </a>
            <a href=${process.env.CORS_ORIGIN} class="btn btn-secondary" id="homeBtn">
                Home Page
                <div class="loading-dots" style="display: none;" id="homeLoading">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </a>
            <button onclick="window.history.back()" class="btn btn-outline" id="retryBtn">
                Back
                <div class="loading-dots" style="display: none;" id="retryLoading">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>
        </div>
        
        <details class="technical-info">
            <summary>Technical Details</summary>
            <pre id="errorDetails">Server encountered an internal error. Please check the server logs for more information.</pre>
        </details>
        
        <div class="support-section">
            <p class="support-text">If the problem persists, please contact our support team:</p>
            <div class="contact-info">
                <div class="contact-item">
                    <span>📧</span>
                    <span>saadicollection18@gmail.com</span>
                </div>
                <div class="contact-item">
                    <span>📞</span>
                    <span>+92 340 9751709</span>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Add loading indicators to buttons
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', function(e) {
                const loadingId = this.id + 'Loading';
                const loadingElement = document.getElementById(loadingId);
                if (loadingElement) {
                    loadingElement.style.display = 'inline-flex';
                    // Simulate network delay for demo
                    setTimeout(() => {
                        loadingElement.style.display = 'none';
                    }, 2000);
                }
            });
        });

        // Auto-retry after 10 seconds
        setTimeout(() => {
            document.getElementById('autoRetryMessage').style.display = 'block';
        }, 10000);

    </script>
</body>
</html>
    `
}