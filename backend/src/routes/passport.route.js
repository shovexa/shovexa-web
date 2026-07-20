import { Router } from "express";
import passport from "passport";
import { signupWithGoogleError } from "../utils/signupWithGoogleErrorFile.js";
import { signupWithGoogleUnknownError } from "../utils/signupWithGoogleUnknownError.js";
import { generateAccessAndRefereshTokens } from "../controllers/User.controller.js";

const passportRouter = Router();

passportRouter.get("/google", (req, res, next) => {
    const track = typeof req.query.track === "string" ? req.query.track : "/";
    passport.authenticate("google", {
        scope: ["profile", "email"],
        state: encodeURIComponent(track),
    })(req, res, next);
});
passportRouter.get(
    "/google/callback",
    (req, res, next) => {
        passport.authenticate("google", (err, user, info) => {
            if (err) return res.send(signupWithGoogleUnknownError(err));

            if (!user) {
                return res.status(401).send(signupWithGoogleError(info));
            }

            req.logIn(user, async (err) => {
                if (err) return res.status(500).send("Login failed");

                const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(req.user._id);
                const options = {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: process.env.NODE_ENV === 'production' ? "None" : 'Lax',
                };

                // decode + validate the returned state before using it
                let track = "/";
                if (typeof req.query.state === "string") {
                    try {
                        const decoded = decodeURIComponent(req.query.state);
                        console.log('decoded',decoded)
                        if (decoded.startsWith("/") && !decoded.startsWith("//")) {
                            track = decoded;
                        }
                    } catch {
                        track = "/";
                    }
                }

                res
                    .cookie("refreshToken", refreshToken, options)
                    .cookie("accessToken", accessToken, options)
                    .redirect(`${process.env.CORS_ORIGIN}${track}`);
            });
        })(req, res, next);
    }
);







export default passportRouter;