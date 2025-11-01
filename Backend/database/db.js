import mongoose, { connect } from "mongoose";

const MONGO_URL = process.env.MONGO_URL

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected✅");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
};


export default connectDB;
