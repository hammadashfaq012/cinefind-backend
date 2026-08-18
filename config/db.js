// MongoDB connection utility.
// Uses Mongoose to connect to the Atlas cluster defined in MONGO_URI.
// Exits the process on failure so the server doesn't run without a database.

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
