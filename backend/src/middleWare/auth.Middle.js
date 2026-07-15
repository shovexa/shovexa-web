import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/apiError.js";

dotenv.config({ path: ".env" });

const authMiddleware = async (req, res, next) => {
  try {
    const accessToken =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!accessToken) {
      return next(new ApiError(401, "Unauthorized"));
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET);

    if (!decoded?.id) {
      return next(new ApiError(401, "Unauthorized. Invalid token."));
    }

    const userExists = await User.findById(decoded.id);

    if (!userExists) {
      return next(new ApiError(401, "User not found!"));
    }

    req.user = userExists;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new ApiError(401, "Access token expired. Please refresh your token."));
    }
    if (error.name === "JsonWebTokenError") {
      console.log("authMiddleware error", error);
      return next(new ApiError(401, "Invalid token. Please log in again."));
    }

    console.error("Unknown authMiddleware error:", error);
    next(new ApiError(500, "Internal server error"));
  }
};

export { authMiddleware };
