import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
    path: ".env",
});

const DB_URL=process.env.DB_URL

if (!DB_URL) {
  throw new Error("DB_URL is missing in environment variables");
}

const connectDb = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};

export default connectDb;
