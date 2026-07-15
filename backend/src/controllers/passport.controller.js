  import { asyncHandler } from "../utils/asyncHandler.js";
import { generateAccessAndRefereshTokens } from "./User.controller.js";
// import generateAccessAndRefereshTokens from "../utils/generateAccessToken.utils.js";
  
  
  const passportController= asyncHandler(async (req, res) => {
    
    console.log('req',req)
  if (!req.user) {
throw new ApiError(401,"Unauthorized")
  }
  console.log('user in goole ',req.user)
  const { accessToken, refreshToken } =await generateAccessAndRefereshTokens(req.user._id);
// console.log('refreshToken ingoogle/callback',refreshToken)
// console.log('accessToken ingoogle/callback',accessToken)
const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? "None" : 'Lax',
    // domain: process.env.WEBSITE_URL,

}

    res
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)      
      .redirect(process.env.origin);
  })

  export {passportController}