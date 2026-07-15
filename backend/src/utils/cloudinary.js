import { v2 as cloudinary } from "cloudinary";
import { ApiError } from "./apiError.js";

cloudinary.config(
  {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  }
);
const uploadOnCloudinary = async (buffer, folder) => {
  return new Promise((resolve, reject) => {
   const stream = cloudinary.uploader.upload_stream(
  {
    resource_type: "auto",
    folder,
  },
  (error, result) => {

    if (error) {
      console.log(error);
      return reject(error);
    }

    console.log(result);
    resolve(result);
  }
);
console.log('stream',stream)
    stream.end(buffer);
  });
};

export { uploadOnCloudinary };