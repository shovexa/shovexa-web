import express from "express"
import { userRouter } from "./routes/user.routes.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors"
import { ApiError } from "./utils/apiError.js";
import { sellerRouter } from "./routes/seller.routes.js";
import { productRouter } from "./routes/product.routes.js";
import {  sortingRouters } from "./routes/sorting.routes.js";
import {  orderRouters } from "./routes/order.routes.js";
import {  addressRouters } from "./routes/address.routes.js";
import {  reviewsRouters } from "./routes/reviews.routes.js";
import categoryRouter from "./routes/category.routes.js";
import { cartRouter } from "./routes/cart.rout.js";
import favoritRouter from "./routes/favorate.routes.js";
import sellerRequestRoutes from "./routes/storeRequests.routes.js";
import { contactUsRouter } from "./routes/contactUs.route.js";
import webhookRouter from "./routes/pyment/webhook.routes.js";
import { adminRoutes } from "./routes/adminRoutes/admin.routes.js";
import userPaymentRouter from "./routes/userPayment.route.js";
import passport from "./passport.js"
import passportRouter from "./routes/passport.route.js";
import MongoStore from "connect-mongo"
import session from "express-session";
const app = express()
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true, 
   

  })
);

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>eCommerce API</title>
        <style>
          body {
            margin: 0;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(to right, #eef2f3, #8e9eab);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
          .container {
            background-color: #fff;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
            text-align: center;
            max-width: 500px;
            width: 90%;
          }
          h1 {
            color: #2d3748;
            margin-bottom: 10px;
            font-size: 24px;
          }
          p {
            color: #555;
            font-size: 16px;
            margin-top: 0;
          }
          a {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #0070f3;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            transition: background-color 0.3s ease;
          }
          a:hover {
            background-color: #0051b3;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome to the eCommerce API</h1>
          <p>This is the backend API for the e-commerce application.</p>
          <a href="https://github.com/umarkhitabwazir/chat-application-backend" target="_blank">View Documentation</a>
        </div>
      </body>
    </html>
  `);
});
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
  })
)




app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.SESSION_SECRET, 
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: process.env.DB_URL,
            collectionName: "sessions",
    }),
        cookie: { 
            secure: process.env.NODE_ENV==='production',
            httpOnly: true,
             sameSite: "lax",
             
            }, 
    })
);
app.use(cookieParser());
app.use(passport.initialize())
app.use(passport.session())
app.use('/api/v2/auth', passportRouter)
app.use(cookieParser());
app.use("/api/v2",
  adminRoutes,
     userRouter,
   productRouter,
   sortingRouters,
   orderRouters,
   addressRouters,
   reviewsRouters,
  cartRouter,
   categoryRouter,
   favoritRouter,
   sellerRequestRoutes,
   contactUsRouter,
   webhookRouter,
   sellerRouter,
   userPaymentRouter


  )



app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    // Handle custom ApiError
    console.log('instanceoferror',err)
    res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
  } else {
    // Handle generic errors
    console.error("Error:", err.stack);
    res.status(500).json({
      success: false,
      error: "An unexpected error occurred.",
    });
  }
});



export   default app 









