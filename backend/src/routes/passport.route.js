import { Router } from "express";
import passport from "passport";
import { signupWithGoogleError } from "../utils/signupWithGoogleErrorFile.js";
import { signupWithGoogleUnknownError } from "../utils/signupWithGoogleUnknownError.js";
import { generateAccessAndRefereshTokens } from "../controllers/User.controller.js";

const passportRouter = Router();

passportRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] })
);
passportRouter.get(
    "/google/callback",
    (req, res, next) => {
        passport.authenticate("google", (err, user, info) => {
            if (err) return res.send(signupWithGoogleUnknownError(err));

            if (!user) {
                // handle error message from strategy
                return res.status(401).send( signupWithGoogleError(info));
            }
            req.logIn(user,async (err) => {
                if (err) return res.status(500).send("Login failed");
                  const { accessToken, refreshToken } =await generateAccessAndRefereshTokens(req.user._id);
                               const options = {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: process.env.NODE_ENV === 'production' ? "None" : 'Lax',
                    // domain: process.env.WEBSITE_URL,
                
                }
                
                    res
                      .cookie("refreshToken", refreshToken, options)
                      .cookie("accessToken", accessToken, options)      
                      .redirect(process.env.CORS_ORIGIN);
            });
        })(req, res, next);
    }
);







export default passportRouter;