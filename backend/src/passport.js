import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import passport from 'passport'
import { User } from './models/User.model.js';
import dotenv from 'dotenv';
dotenv.config(
    {
        path: '.env'
    }

);

export default passport.use(

    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            // callbackURL: `${process.env.CORS_ORIGIN}`,
            callbackURL: `/api/v2/auth/google/callback`,
            scope: ['profile', 'email'],
        },
        async (accessToken,refreshToken, profile, done) => {
         

            try {
                let user = await User.findOne({ googleId: profile.id });
                if (user) {
                    
                    return done(null, user)

                }
                const existUserWithEmail = await User.findOne({ email: profile.emails[0].value });


                if (existUserWithEmail) {
                return done(null, false, { message: "User already exists with this email, please login with password" });
                }
              
             
                if (!user ) {
                    // New signup
                    user = await User.create({
                        googleId: profile.id,
                        email: profile.emails[0].value,
                        username: profile.displayName,                        
                        isVerified:true,
                        status:"approved"

                    });
                }
                
                
            } catch (err) {
                console.log('sign up with google error', err)
   return done(null, false, { message: err});
            

            }
        }
    )
)
passport.serializeUser(async (user, done) => {
    done(null, user._id)
})
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
})