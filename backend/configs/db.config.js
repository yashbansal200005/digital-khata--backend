import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Make sure it's included here too if not in server.js

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI?.replace(/\/$/, ''); // remove trailing slash if exists

    if (!uri || (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://'))) {
      throw new Error("Invalid MongoDB URI");
    }

    await mongoose.connect(`${uri}/ecom`);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
